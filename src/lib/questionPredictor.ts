import {
  Syllabus,
  MarksCategory,
  QuestionType,
  QuestionDifficulty,
  ImportanceFilter,
  GeneratedQuestion
} from '@/types';

interface QuestionTemplate {
  template: (topic: string, unit: string) => string;
  marks: MarksCategory[];
  types: QuestionType[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  baseScore: number;
  rationale: string;
}

const TEMPLATES: QuestionTemplate[] = [
  // 1-2 Marks (Short answers / definitions)
  {
    template: (topic, unit) => `Define ${topic} and state its primary significance in ${unit}.`,
    marks: [1, 2],
    types: ['Theory', 'Mixed'],
    difficulty: 'Easy',
    baseScore: 78,
    rationale: 'Fundamental concept definition frequently tested in Part-A compulsory sections.'
  },
  {
    template: (topic) => `What are the two major advantages and limitations of ${topic}?`,
    marks: [2],
    types: ['Theory', 'Problem Solving', 'Mixed'],
    difficulty: 'Easy',
    baseScore: 82,
    rationale: 'Core diagnostic question testing foundational understanding without lengthy derivation.'
  },
  {
    template: (topic) => `State the mathematical or logical condition required for ${topic} to hold true.`,
    marks: [2],
    types: ['Numerical', 'Theory', 'Mixed'],
    difficulty: 'Medium',
    baseScore: 85,
    rationale: 'Prerequisite condition testing analytical rigor.'
  },

  // 5 Marks (Brief explanations / medium questions)
  {
    template: (topic, unit) => `Explain the underlying architecture and working mechanism of ${topic} with a neat schematic diagram.`,
    marks: [5],
    types: ['Theory', 'Diagram Based', 'Mixed'],
    difficulty: 'Medium',
    baseScore: 88,
    rationale: 'High-frequency mid-weight question requiring architectural conceptualization and visual representation.'
  },
  {
    template: (topic) => `Differentiate between conventional approaches and modern implementations of ${topic}. Highlight key operational tradeoffs.`,
    marks: [5],
    types: ['Theory', 'Case Study', 'Mixed'],
    difficulty: 'Medium',
    baseScore: 86,
    rationale: 'Comparative analysis question commonly appearing in university mid-semester and end-semester tests.'
  },
  {
    template: (topic) => `Given a standard dataset or operational scenario, calculate the step-by-step efficiency and algorithmic outcome using ${topic}.`,
    marks: [5],
    types: ['Numerical', 'Problem Solving', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 90,
    rationale: 'Quantitative problem verifying students can apply algorithmic steps numerically.'
  },

  // 10 Marks (Major comprehensive questions)
  {
    template: (topic, unit) => `Critically analyze ${topic} within ${unit}. Provide an end-to-end mathematical or procedural formulation along with a complete illustrative example.`,
    marks: [10],
    types: ['Theory', 'Problem Solving', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 94,
    rationale: 'Central syllabus anchor topic; standard 10-mark essay and analytical derivation candidate.'
  },
  {
    template: (topic) => `Design a robust system or algorithmic pipeline utilizing ${topic}. Detail data structures, control flow, edge-case mitigation, and time/space complexity analysis.`,
    marks: [10],
    types: ['Programming', 'Problem Solving', 'Diagram Based', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 95,
    rationale: 'Synthesis problem testing design, coding logic, and complexity optimization.'
  },
  {
    template: (topic, unit) => `A production enterprise encounters performance degradation and scalability constraints related to ${unit}. Formulate a comprehensive Case Study resolving this using ${topic}.`,
    marks: [10],
    types: ['Case Study', 'Problem Solving', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 92,
    rationale: 'Application-oriented scenario question testing higher-order Bloom taxonomy skills.'
  },

  // 14 / 16 Marks (Terminal University Examination Comprehensive / Long Essays)
  {
    template: (topic, unit) => `(a) Provide an exhaustive architectural exposition of ${topic} with comprehensive component diagrams (8 Marks).\n(b) Step-by-step derive the governing equations/algorithms, and demonstrate on a non-trivial benchmark scenario (8 Marks).`,
    marks: [16, 14],
    types: ['Theory', 'Diagram Based', 'Problem Solving', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 98,
    rationale: 'Compulsory terminal examination 16-mark long question spanning theoretical formulation and applied derivation.'
  },
  {
    template: (topic) => `Implement a full production-ready code implementation of ${topic}. Discuss design patterns employed, exception handling, multithreading considerations, and benchmark against naive implementations.`,
    marks: [14, 16],
    types: ['Programming', 'Case Study', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 96,
    rationale: 'Comprehensive implementation problem evaluating software craftsmanship and algorithmic soundness.'
  },
  {
    template: (topic, unit) => `Formulate a formal mathematical proof and step-by-step numerical execution for ${topic}. Analyze boundary convergence, edge cases, and stability criteria under adverse inputs in ${unit}.`,
    marks: [14, 16],
    types: ['Numerical', 'Theory', 'Problem Solving', 'Mixed'],
    difficulty: 'Hard',
    baseScore: 97,
    rationale: 'Rigorous quantitative and theoretical proof question typical of university terminal honors papers.'
  }
];

export interface GenerationParams {
  syllabus: Syllabus;
  selectedUnitIds: string[];
  selectedTopicIds: string[];
  marks: MarksCategory;
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  questionCount: number;
  importanceFilter: ImportanceFilter;
  universityName?: string;
  isDemoGeneration?: boolean;
}

export function generatePredictedQuestions(params: GenerationParams): {
  questions: GeneratedQuestion[];
  unsupportedNotice?: string;
} {
  const {
    syllabus,
    selectedUnitIds,
    selectedTopicIds,
    marks,
    questionType,
    difficulty,
    questionCount,
    importanceFilter
  } = params;

  // 1. Filter units and topics strictly from the syllabus source
  const targetUnits = syllabus.units.filter((u) =>
    selectedUnitIds.length === 0 ? true : selectedUnitIds.includes(u.id)
  );

  if (targetUnits.length === 0) {
    return {
      questions: [],
      unsupportedNotice: 'No matching syllabus units found in the selected configuration.'
    };
  }

  // Collect target topics
  const candidateTopics: { topicName: string; unitTitle: string; unitNum: number; baseTopicScore: number }[] = [];

  targetUnits.forEach((u) => {
    u.topics.forEach((t) => {
      if (selectedTopicIds.length === 0 || selectedTopicIds.includes(t.id)) {
        candidateTopics.push({
          topicName: t.name,
          unitTitle: u.title,
          unitNum: u.unitNumber,
          baseTopicScore: t.importanceScore || 85
        });
      }
    });
  });

  if (candidateTopics.length === 0) {
    return {
      questions: [],
      unsupportedNotice:
        'The selected topics lack sufficient detailed material in the uploaded syllabus. Please select additional topics or units.'
    };
  }

  // 2. Filter matching templates
  let matchingTemplates = TEMPLATES.filter((tmpl) => tmpl.marks.includes(marks));

  if (questionType !== 'Mixed') {
    const typeMatched = matchingTemplates.filter(
      (tmpl) => tmpl.types.includes(questionType) || tmpl.types.includes('Mixed')
    );
    if (typeMatched.length > 0) matchingTemplates = typeMatched;
  }

  if (difficulty !== 'Mixed') {
    const diffMatched = matchingTemplates.filter((tmpl) => tmpl.difficulty === difficulty);
    if (diffMatched.length > 0) matchingTemplates = diffMatched;
  }

  if (matchingTemplates.length === 0) {
    // Fallback template
    matchingTemplates = [
      {
        template: (topic, unit) => `Explain the core concepts and real-world implications of ${topic} in ${unit}.`,
        marks: [marks],
        types: ['Theory'],
        difficulty: difficulty === 'Mixed' ? 'Medium' : difficulty,
        baseScore: 85,
        rationale: 'Essential curriculum learning outcome validated directly against source syllabus.'
      }
    ];
  }

  // 3. Generate candidate questions and deduplicate
  const generated: GeneratedQuestion[] = [];
  const seenTexts = new Set<string>();

  let topicIndex = 0;
  let templateIndex = 0;
  let attempts = 0;
  const maxAttempts = questionCount * 12;

  while (generated.length < questionCount && attempts < maxAttempts) {
    attempts++;
    const currentTopic = candidateTopics[topicIndex % candidateTopics.length];
    const currentTemplate = matchingTemplates[templateIndex % matchingTemplates.length];
    topicIndex++;
    templateIndex++;

    const questionText = currentTemplate.template(currentTopic.topicName, currentTopic.unitTitle);

    // Exact duplicate check
    if (seenTexts.has(questionText.toLowerCase())) {
      continue;
    }
    seenTexts.add(questionText.toLowerCase());

    // Calculate normalized importance score (0 - 100)
    const combinedScore = Math.min(
      99,
      Math.max(45, Math.round(currentTopic.baseTopicScore * 0.6 + currentTemplate.baseScore * 0.4))
    );

    // Map to star rating and predicted importance
    let starRating = 3;
    let predictedImportance: 'Very High' | 'High' | 'Medium' | 'Low' = 'Medium';

    if (combinedScore >= 88) {
      starRating = 5;
      predictedImportance = 'Very High';
    } else if (combinedScore >= 75) {
      starRating = 4;
      predictedImportance = 'High';
    } else if (combinedScore >= 55) {
      starRating = 3;
      predictedImportance = 'Medium';
    } else {
      starRating = 2;
      predictedImportance = 'Low';
    }

    // Filter by importance if specified
    if (importanceFilter !== 'All') {
      if (importanceFilter === 'Very High' && predictedImportance !== 'Very High') continue;
      if (importanceFilter === 'High' && !['Very High', 'High'].includes(predictedImportance)) continue;
      if (importanceFilter === 'Medium' && predictedImportance === 'Low') continue;
    }

    const questionNumber = generated.length + 1;

    generated.push({
      id: `q-${Date.now()}-${questionNumber}-${Math.random().toString(36).substring(2, 6)}`,
      questionNumber,
      questionText,
      marks,
      questionType: questionType === 'Mixed' ? currentTemplate.types[0] : questionType,
      unitTitle: currentTopic.unitTitle,
      topicTitle: currentTopic.topicName,
      difficulty: difficulty === 'Mixed' ? currentTemplate.difficulty : difficulty,
      predictedImportance,
      starRating,
      scorePercentage: combinedScore,
      sourceSyllabusRef: `${syllabus.subjectName} — Unit ${currentTopic.unitNum}: ${currentTopic.unitTitle}`,
      rationale: `${currentTemplate.rationale} Derived strictly from syllabus topic "${currentTopic.topicName}".`,
      suggestedAnswerOutline: [
        `Part 1: Formal definition and context of ${currentTopic.topicName}`,
        `Part 2: Primary architectural breakdown / key governing steps`,
        `Part 3: Practical example or comparison diagram demonstrating application`,
        `Part 4: Concluding remarks on performance, trade-offs, and exam evaluation rubric`
      ]
    });
  }

  return {
    questions: generated
  };
}
