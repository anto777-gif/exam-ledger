export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  passwordHash: string;
  createdAt: string;
}

export interface SyllabusTopic {
  id: string;
  name: string;
  description?: string;
  subtopics?: string[];
  estimatedHours: number;
  complexity: 'Easy' | 'Medium' | 'Hard';
  importanceScore: number; // 0 - 100
  learningOutcomes?: string[];
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  description?: string;
  topics: SyllabusTopic[];
}

export interface TeachingSession {
  sessionNumber: number;
  title: string;
  unitReferences: string[];
  topicsCovered: string[];
  estimatedDurationMinutes: number;
  learningObjectives: string[];
  teachingApproach: string;
  suggestedPracticalActivity?: string;
  quickRevisionQuestions: string[];
  expectedLearningOutcome: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  coverageStatus: 'Full' | 'Condensed' | 'Review Needed';
}

export interface TeachingPlan {
  id: string;
  syllabusId: string;
  totalUnitsCount: number;
  totalTopicsCount: number;
  estimatedInstructionalHours: number;
  estimatedSessionsRequired: number;
  requestedSessions: number;
  coveragePercentage: number;
  sessions: TeachingSession[];
  topicsRequiringReview: string[];
  uncoveredOrAmbiguousTopics: string[];
  workloadWarning?: string;
  createdAt: string;
}

export interface Syllabus {
  id: string;
  userId: string; // Teacher who uploaded
  subjectName: string;
  subjectCode?: string;
  department?: string;
  semester?: string;
  university?: string;
  originalFileName?: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'text';
  rawText: string;
  status: 'Uploaded' | 'Processing' | 'Completed' | 'Needs Review' | 'Failed';
  processingError?: string;
  isDemo?: boolean;
  version: string;
  units: SyllabusUnit[];
  teachingPlan?: TeachingPlan;
  createdAt: string;
  updatedAt: string;
}

export type MarksCategory = 1 | 2 | 5 | 10 | 14 | 16;
export type QuestionType =
  | 'Theory'
  | 'Numerical'
  | 'Programming'
  | 'Diagram Based'
  | 'Case Study'
  | 'Problem Solving'
  | 'Mixed';
export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
export type ImportanceFilter = 'Very High' | 'High' | 'Medium' | 'All';

export interface GeneratedQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  marks: number;
  questionType: string;
  unitTitle: string;
  topicTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  predictedImportance: 'Very High' | 'High' | 'Medium' | 'Low';
  starRating: number; // 1 to 5
  scorePercentage: number; // 0 - 100
  sourceSyllabusRef: string;
  rationale: string;
  suggestedAnswerOutline?: string[];
}

export interface QuestionRequestRecord {
  id: string;
  studentId: string;
  syllabusId: string;
  subjectName: string;
  selectedUnits: string[];
  selectedTopics: string[];
  marks: MarksCategory;
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  questionCount: number;
  importanceFilter: ImportanceFilter;
  universityName?: string;
  isDemoGeneration?: boolean;
  questions: GeneratedQuestion[];
  createdAt: string;
}

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'teacher' | 'student';
  };
  token: string;
}
