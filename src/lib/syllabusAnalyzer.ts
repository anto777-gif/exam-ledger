import { SyllabusUnit, SyllabusTopic, TeachingPlan, TeachingSession } from '@/types';

export interface SyllabusAnalysisResult {
  units: SyllabusUnit[];
  totalTopics: number;
  totalInstructionalHours: number;
  estimatedSessionsRequired: number;
  coveragePercentage: number;
  topicsRequiringReview: string[];
  uncoveredOrAmbiguousTopics: string[];
  teachingPlan: TeachingPlan;
}

export function parseSyllabusStructure(rawText: string, syllabusId: string, requestedSessions: number = 6): SyllabusAnalysisResult {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const units: SyllabusUnit[] = [];
  let currentUnit: SyllabusUnit | null = null;
  let unitCounter = 0;
  let topicCounter = 0;

  const topicsRequiringReview: string[] = [];
  const uncoveredOrAmbiguousTopics: string[] = [];

  // Regex patterns to match Unit / Module headers
  const unitRegex = /^(?:unit|module|chapter|part)\s*([0-9ivxlc]+)[:\.\-\s]+(.*)$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(unitRegex);

    if (match) {
      unitCounter++;
      const unitNum = unitCounter;
      const unitTitle = match[2].trim() || `Unit ${unitNum}`;

      currentUnit = {
        id: `u-${syllabusId}-${unitCounter}`,
        unitNumber: unitNum,
        title: unitTitle,
        description: `Topics and curriculum objectives covered in Unit ${unitNum}.`,
        topics: []
      };
      units.push(currentUnit);
    } else if (currentUnit) {
      // It's a topic under the current unit
      // Clean bullet points
      const cleanLine = line.replace(/^[\-\*\•\d+\.]+\s*/, '').trim();
      if (cleanLine.length > 3) {
        // Check if there are subtopics separated by commas or semicolons
        const parts = cleanLine.split(/[,;]/).map((p) => p.trim()).filter((p) => p.length > 0);
        const primaryTopic = parts[0];
        const subtopics = parts.slice(1);

        topicCounter++;
        const isComplex = cleanLine.length > 60 || /algorithm|architecture|design|optimization|security|derivation/i.test(cleanLine);
        const complexity = isComplex ? 'Hard' : cleanLine.length > 30 ? 'Medium' : 'Easy';
        const hours = complexity === 'Hard' ? 5 : complexity === 'Medium' ? 4 : 3;
        
        // Importance score calculation based on curriculum keywords
        let baseScore = 70;
        if (/fundamental|core|architecture|algorithm|model|protocol|analysis/i.test(cleanLine)) baseScore += 15;
        if (/introduction|history|overview/i.test(cleanLine)) baseScore -= 10;
        if (complexity === 'Hard') baseScore += 10;
        const importanceScore = Math.min(98, Math.max(50, baseScore));

        currentUnit.topics.push({
          id: `t-${currentUnit.id}-${currentUnit.topics.length + 1}`,
          name: primaryTopic,
          subtopics: subtopics.length > 0 ? subtopics : undefined,
          estimatedHours: hours,
          complexity,
          importanceScore,
          learningOutcomes: [`Explain and apply ${primaryTopic} principles and solve related examination questions.`]
        });
      }
    } else {
      // Lines before the first explicit "Unit" header
      if (/^(%PDF|xref|trailer|startxref|\d+\s+\d+\s+obj|<<|>>)/i.test(line) || line.includes('/FlateDecode') || line.includes('/Font')) {
        continue;
      }
      if (/syllabus|course content|curriculum/i.test(line)) {
        continue;
      }
      // If no unit has been declared yet, create an introductory default unit
      if (!currentUnit && units.length === 0) {
        unitCounter = 1;
        currentUnit = {
          id: `u-${syllabusId}-1`,
          unitNumber: 1,
          title: 'Foundational Topics & Core Concepts',
          description: 'Initial unit generated from curriculum outline.',
          topics: []
        };
        units.push(currentUnit);
      }
      const cleanLine = line.replace(/^[\-\*\•\d+\.]+\s*/, '').trim();
      // Ensure the line contains normal human language words, not binary/hex/pdf tokens
      const isValidText = cleanLine.length > 3 && !/^[\/%]/.test(cleanLine) && /[a-zA-Z]{3,}/.test(cleanLine);
      if (isValidText && currentUnit) {
        topicCounter++;
        currentUnit.topics.push({
          id: `t-${currentUnit.id}-${currentUnit.topics.length + 1}`,
          name: cleanLine,
          estimatedHours: 4,
          complexity: 'Medium',
          importanceScore: 82,
          learningOutcomes: [`Understand ${cleanLine} in context of the course curriculum.`]
        });
      }
    }
  }

  // If still empty or no topics found, synthesize from paragraphs
  if (units.length === 0 || topicCounter === 0) {
    const defaultUnit: SyllabusUnit = {
      id: `u-${syllabusId}-1`,
      unitNumber: 1,
      title: 'Course Curriculum & Core Topics',
      description: 'Extracted topics from syllabus source document.',
      topics: lines.slice(0, 10).map((l, idx) => ({
        id: `t-${syllabusId}-${idx + 1}`,
        name: l.replace(/^[\-\*\•\d+\.]+\s*/, '').trim(),
        estimatedHours: 4,
        complexity: 'Medium',
        importanceScore: 80,
        learningOutcomes: [`Master core examination topics.`]
      }))
    };
    units.push(defaultUnit);
    topicCounter = defaultUnit.topics.length;
  }

  // Calculate totals
  const allTopics: { topic: SyllabusTopic; unitTitle: string }[] = [];
  units.forEach((u) => {
    u.topics.forEach((t) => {
      allTopics.push({ topic: t, unitTitle: u.title });
    });
  });

  const totalInstructionalHours = allTopics.reduce((acc, curr) => acc + curr.topic.estimatedHours, 0);
  
  // Standard session is 60 minutes = 1 hour of instructional pace + discussion.
  // Full curriculum requires roughly totalInstructionalHours / 5 sessions (e.g. 50 hours -> 10 sessions)
  const estimatedSessionsRequired = Math.max(4, Math.ceil(totalInstructionalHours / 5.5));

  // Determine warnings if requested is 6 and required is higher
  let workloadWarning: string | undefined = undefined;
  if (requestedSessions < estimatedSessionsRequired) {
    workloadWarning = `Estimated teaching requirement is ${estimatedSessionsRequired} sessions (${totalInstructionalHours} lecture hours). Delivering this curriculum across ${requestedSessions} requested sessions requires condensing compatible topics and emphasizing highest-weight concepts.`;
  }

  // Distribute topics across requestedSessions (default 6)
  const sessions: TeachingSession[] = [];
  const targetSessions = Math.max(1, requestedSessions);
  
  // Group topics into targetSessions buckets
  const totalTopicsCount = allTopics.length;
  const topicsPerSession = Math.max(1, Math.ceil(totalTopicsCount / targetSessions));

  for (let s = 1; s <= targetSessions; s++) {
    const startIdx = (s - 1) * topicsPerSession;
    const endIdx = Math.min(totalTopicsCount, s * topicsPerSession);
    const sessionTopics = allTopics.slice(startIdx, endIdx);

    if (sessionTopics.length === 0) {
      // If we ran out of topics, assign revision or cap
      sessions.push({
        sessionNumber: s,
        title: `Comprehensive Review, Mock Problem Solving & Exam Preparation`,
        unitReferences: units.map((u) => u.title).slice(0, 2),
        topicsCovered: ['Integrated Syllabus Review', 'High-Probability Examination Analysis'],
        estimatedDurationMinutes: 60,
        learningObjectives: ['Synthesize multi-unit relationships', 'Practice high-mark exam problems under timed conditions'],
        teachingApproach: 'Interactive Socratic seminar and mock question critique',
        suggestedPracticalActivity: 'Solve 14/16-mark previous exam questions with rubric assessment',
        quickRevisionQuestions: ['What are the three most recurring theoretical derivations in this course?'],
        expectedLearningOutcome: 'Students gain confidence connecting inter-unit concepts for terminal exams.',
        difficulty: 'Intermediate',
        coverageStatus: 'Full'
      });
      continue;
    }

    const uniqueUnits = Array.from(new Set(sessionTopics.map((st) => st.unitTitle)));
    const topicNames = sessionTopics.map((st) => st.topic.name);
    const hasHard = sessionTopics.some((st) => st.topic.complexity === 'Hard');
    const difficulty = hasHard ? 'Advanced' : sessionTopics.some((st) => st.topic.complexity === 'Medium') ? 'Intermediate' : 'Beginner';
    const isCondensed = sessionTopics.length >= 3;

    if (isCondensed && hasHard) {
      topicsRequiringReview.push(`Session ${s}: Topics "${topicNames.join(', ')}" represent heavy instructional load.`);
    }

    const primaryTopic = sessionTopics[0].topic.name;

    sessions.push({
      sessionNumber: s,
      title: `${primaryTopic} & ${uniqueUnits[0]}`,
      unitReferences: uniqueUnits,
      topicsCovered: topicNames,
      estimatedDurationMinutes: 60,
      learningObjectives: sessionTopics.flatMap((st) => st.topic.learningOutcomes || [`Understand ${st.topic.name}`]).slice(0, 3),
      teachingApproach: hasHard
        ? 'Detailed theoretical derivation with step-by-step blackboard walkthrough and problem solving'
        : 'Conceptual lecture with real-world case analysis and interactive Q&A',
      suggestedPracticalActivity: `Implement or diagram a working exemplar demonstrating ${primaryTopic}`,
      quickRevisionQuestions: [
        `Explain the fundamental principle behind ${primaryTopic}.`,
        `How does ${topicNames[topicNames.length - 1] || primaryTopic} interface with overall system architecture?`
      ],
      expectedLearningOutcome: `Students demonstrate theoretical mastery and analytical problem-solving in ${primaryTopic}.`,
      difficulty,
      coverageStatus: isCondensed ? 'Condensed' : 'Full'
    });
  }

  const teachingPlan: TeachingPlan = {
    id: `tp-${syllabusId}-${Date.now()}`,
    syllabusId,
    totalUnitsCount: units.length,
    totalTopicsCount,
    estimatedInstructionalHours: totalInstructionalHours,
    estimatedSessionsRequired,
    requestedSessions,
    coveragePercentage: 100,
    sessions,
    topicsRequiringReview,
    uncoveredOrAmbiguousTopics,
    workloadWarning,
    createdAt: new Date().toISOString()
  };

  return {
    units,
    totalTopics: totalTopicsCount,
    totalInstructionalHours,
    estimatedSessionsRequired,
    coveragePercentage: 100,
    topicsRequiringReview,
    uncoveredOrAmbiguousTopics,
    teachingPlan
  };
}
