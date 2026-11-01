import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getSyllabusesByTeacherId, getPublishedSyllabuses, saveSyllabus, getAllSyllabuses } from '@/lib/db';
import { extractTextFromFile } from '@/lib/parser';
import { parseSyllabusStructure } from '@/lib/syllabusAnalyzer';
import { Syllabus } from '@/types';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  const searchParams = req.nextUrl.searchParams;
  const role = searchParams.get('role');

  if (role === 'student' || !user || user.role === 'student') {
    // Students or public browse can retrieve published/completed syllabuses
    const published = getPublishedSyllabuses();
    return NextResponse.json({ syllabuses: published });
  }

  // Teacher view: get teacher's own uploads + default demo list
  const teacherSyllabuses = getSyllabusesByTeacherId(user.id);
  // Also include the demo syllabuses for reference
  const demoSyllabuses = getAllSyllabuses().filter((s) => s.isDemo);

  return NextResponse.json({
    teacherSyllabuses,
    demoSyllabuses,
    allVisible: [...teacherSyllabuses, ...demoSyllabuses]
  });
}

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);

  // Strictly enforce Teacher role on the server
  if (!user || user.role !== 'teacher') {
    return NextResponse.json(
      { error: 'Forbidden: Only verified Teachers are permitted to upload and process syllabuses.' },
      { status: 403 }
    );
  }

  try {
    const formData = await req.formData();
    const subjectName = (formData.get('subjectName') as string)?.trim();
    const subjectCode = (formData.get('subjectCode') as string)?.trim() || undefined;
    const department = (formData.get('department') as string)?.trim() || undefined;
    const semester = (formData.get('semester') as string)?.trim() || undefined;
    const university = (formData.get('university') as string)?.trim() || undefined;
    const requestedSessions = parseInt((formData.get('requestedSessions') as string) || '6', 10);
    const directText = (formData.get('directText') as string)?.trim();
    const file = formData.get('file') as File | null;

    if (!subjectName) {
      return NextResponse.json({ error: 'Subject name is required' }, { status: 400 });
    }

    let rawText = directText || '';
    let fileType: 'pdf' | 'docx' | 'txt' | 'text' = 'text';
    let originalFileName: string | undefined = undefined;

    if (file && file.size > 0) {
      originalFileName = file.name;
      const lower = file.name.toLowerCase();

      // Check max size 10MB
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'File exceeds maximum permitted size of 10MB.' }, { status: 400 });
      }

      if (lower.endsWith('.pdf')) fileType = 'pdf';
      else if (lower.endsWith('.docx')) fileType = 'docx';
      else if (lower.endsWith('.txt')) fileType = 'txt';
      else {
        return NextResponse.json(
          { error: 'Unsupported file format. Please upload a PDF, DOCX, or TXT document.' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      try {
        const extracted = await extractTextFromFile(buffer, fileType, file.name);
        rawText = (extracted + '\n' + rawText).trim();
      } catch (parseErr: any) {
        return NextResponse.json(
          { error: `Extraction error: ${parseErr.message || 'Unable to read document contents.'}` },
          { status: 422 }
        );
      }
    }

    if (!rawText || rawText.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            'Insufficient syllabus content. Please provide a document with syllabus content or paste at least 20 characters of curriculum text.'
        },
        { status: 400 }
      );
    }

    const syllabusId = `syl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Parse structure and generate 6-session teaching plan
    const analysis = parseSyllabusStructure(rawText, syllabusId, requestedSessions);

    const newSyllabus: Syllabus = {
      id: syllabusId,
      userId: user.id,
      subjectName,
      subjectCode,
      department,
      semester,
      university,
      originalFileName,
      fileType,
      rawText,
      status: 'Completed',
      version: '1.0',
      units: analysis.units,
      teachingPlan: analysis.teachingPlan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveSyllabus(newSyllabus);

    return NextResponse.json({
      message: 'Syllabus processed and 6-session teaching plan created successfully',
      syllabus: newSyllabus
    });
  } catch (err: any) {
    console.error('Syllabus upload failure:', err);
    return NextResponse.json({ error: err.message || 'Failed to process syllabus' }, { status: 500 });
  }
}
