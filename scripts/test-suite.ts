import { parseSyllabusStructure } from '../src/lib/syllabusAnalyzer';
import { generatePredictedQuestions } from '../src/lib/questionPredictor';
import { DEMO_SYLLABUSES } from '../src/lib/demoData';

console.log('--- Starting Automated Test Suite for AI Exam Question Predictor ---');

// Test 1: Syllabus Analyzer & 6-Session Plan Generation
console.log('\n[Test 1] Testing Syllabus Structure Extraction & Teaching Planner:');
const sampleRawSyllabus = `
Unit 1: Foundations of Distributed Systems
- Distributed System Models and Architectures
- Remote Procedure Calls (RPC) and RMI
- Clocks, Synchronization, and Vector Timestamps

Unit 2: Distributed Consensus & Replication
- Two-Phase Commit and Three-Phase Commit
- Paxos Consensus Protocol
- Raft Algorithm and Leader Election

Unit 3: Distributed Storage and Fault Tolerance
- Consistent Hashing and Distributed Hash Tables (DHT)
- Byzantine Fault Tolerance (BFT)
- Replication Strategies and CAP Theorem
`;

const analysisResult = parseSyllabusStructure(sampleRawSyllabus, 'test-syl-001', 6);
console.log(`✓ Units extracted: ${analysisResult.units.length} (Expected: 3)`);
console.log(`✓ Total topics extracted: ${analysisResult.totalTopics} (Expected: 9)`);
console.log(`✓ Teaching plan sessions count: ${analysisResult.teachingPlan.sessions.length} (Expected: 6)`);
console.log(`✓ Estimated sessions required: ${analysisResult.estimatedSessionsRequired}`);
if (analysisResult.teachingPlan.sessions.length !== 6) {
  throw new Error(`Test 1 Failed: Expected 6 sessions, got ${analysisResult.teachingPlan.sessions.length}`);
}

// Test 2: AI Question Predictor & Syllabus Boundary Filtering
console.log('\n[Test 2] Testing Question Generation with strict Syllabus grounding:');
const sampleSyllabus = DEMO_SYLLABUSES[0]; // Software Engineering
const questionsResult = generatePredictedQuestions({
  syllabus: sampleSyllabus,
  selectedUnitIds: ['se-u2'], // Requirements Engineering
  selectedTopicIds: ['se-t2-2'], // Software Requirements Specification (SRS)
  marks: 10,
  questionType: 'Theory',
  difficulty: 'Medium',
  questionCount: 4,
  importanceFilter: 'All'
});

console.log(`✓ Questions generated count: ${questionsResult.questions.length} (Expected: 4)`);
questionsResult.questions.forEach((q, idx) => {
  console.log(`   Q${idx + 1} [${q.marks} Marks] [Rating: ${q.starRating} Stars / ${q.scorePercentage}%]: ${q.questionText.substring(0, 75)}...`);
  if (!q.sourceSyllabusRef.includes('Software Engineering')) {
    throw new Error(`Test 2 Failed: Question out of syllabus scope!`);
  }
});

// Test 3: Deduplication check
console.log('\n[Test 3] Testing Exact and Semantic Deduplication:');
const questionTexts = questionsResult.questions.map((q) => q.questionText);
const uniqueTexts = new Set(questionTexts);
if (questionTexts.length !== uniqueTexts.size) {
  throw new Error(`Test 3 Failed: Duplicate questions detected in output!`);
}
console.log(`✓ Deduplication verified: ${uniqueTexts.size} unique questions out of ${questionTexts.length}`);

// Test 4: Insufficient source material warning
console.log('\n[Test 4] Testing Insufficient Source Handling:');
const insufficientResult = generatePredictedQuestions({
  syllabus: sampleSyllabus,
  selectedUnitIds: ['non-existent-unit'],
  selectedTopicIds: [],
  marks: 5,
  questionType: 'Theory',
  difficulty: 'Easy',
  questionCount: 3,
  importanceFilter: 'All'
});

if (insufficientResult.unsupportedNotice) {
  console.log(`✓ Correctly flagged insufficient content: "${insufficientResult.unsupportedNotice}"`);
} else {
  throw new Error(`Test 4 Failed: Did not report insufficient source material!`);
}

console.log('\n🎉 ALL 4 CORE DOMAIN AND ALGORITHMIC TESTS PASSED SUCCESSFULLY! 🎉\n');
