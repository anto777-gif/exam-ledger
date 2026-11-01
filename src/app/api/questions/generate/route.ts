import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getSyllabusById, saveQuestionRequest, getQuestionRequestsByStudent } from '@/lib/db';
import { generatePredictedQuestions } from '@/lib/questionPredictor';
import { MarksCategory, QuestionType, QuestionDifficulty, ImportanceFilter, QuestionRequestRecord } from '@/types';
import { z } from 'zod';

const generateSchema = z.object({
  syllabusId: z.string().min(1, 'Syllabus ID is required'),
  selectedUnits: z.array(z.string()).default([]),
  selectedTopics: z.array(z.string()).default([]),
  marks: z.number().refine((val) => [1, 2, 5, 10, 14, 16].includes(val), {
    message: 'Marks must be one of: 1, 2, 5, 10, 14, 16'
  }),
  questionType: z.enum([
    'Theory',
    'Numerical',
    'Programming',
    'Diagram Based',
    'Case Study',
    'Problem Solving',
    'Mixed'
  ]),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Mixed']),
  questionCount: z.number().min(1).max(20),
  importanceFilter: z.enum(['Very High', 'High', 'Medium', 'All']),
  universityName: z.string().optional()
});

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user || user.role !== 'student') {
    return NextResponse.json(
      { error: 'Unauthorized: Student history is only accessible by students.' },
      { status: 403 }
    );
  }

  const history = getQuestionRequestsByStudent(user.id);
  return NextResponse.json({ history });
}

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);

  // Authenticate user (Teachers and Students both permitted)
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Please log in to generate important examination questions.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const result = generateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid parameters' },
        { status: 400 }
      );
    }

    const {
      syllabusId,
      selectedUnits,
      selectedTopics,
      marks,
      questionType,
      difficulty,
      questionCount,
      importanceFilter,
      universityName
    } = result.data;

    const syllabus = getSyllabusById(syllabusId);
    if (!syllabus) {
      return NextResponse.json({ error: 'Selected syllabus could not be found.' }, { status: 404 });
    }

    // Call prediction pipeline with boundary check and deduplication
    const prediction = generatePredictedQuestions({
      syllabus,
      selectedUnitIds: selectedUnits,
      selectedTopicIds: selectedTopics,
      marks: marks as MarksCategory,
      questionType: questionType as QuestionType,
      difficulty: difficulty as QuestionDifficulty,
      questionCount,
      importanceFilter: importanceFilter as ImportanceFilter,
      universityName,
      isDemoGeneration: syllabus.isDemo
    });

    if (prediction.unsupportedNotice && prediction.questions.length === 0) {
      return NextResponse.json(
        {
          error: prediction.unsupportedNotice,
          insufficientContent: true
        },
        { status: 422 }
      );
    }

    // Persist student question request and results record
    const requestRecord: QuestionRequestRecord = {
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId: user.id,
      syllabusId: syllabus.id,
      subjectName: syllabus.subjectName,
      selectedUnits,
      selectedTopics,
      marks: marks as MarksCategory,
      questionType: questionType as QuestionType,
      difficulty: difficulty as QuestionDifficulty,
      questionCount,
      importanceFilter: importanceFilter as ImportanceFilter,
      universityName,
      isDemoGeneration: Boolean(syllabus.isDemo),
      questions: prediction.questions,
      createdAt: new Date().toISOString()
    };

    saveQuestionRequest(requestRecord);

    return NextResponse.json({
      message: 'Questions predicted and validated successfully',
      result: requestRecord
    });
  } catch (err: any) {
    console.error('Question generation failure:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate questions' }, { status: 500 });
  }
}
