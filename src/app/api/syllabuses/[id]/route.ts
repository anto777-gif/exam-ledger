import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getSyllabusById, deleteSyllabus } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const syllabus = getSyllabusById(id);

  if (!syllabus) {
    return NextResponse.json({ error: 'Syllabus not found' }, { status: 404 });
  }

  return NextResponse.json({ syllabus });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAuthUserFromRequest(req);

  if (!user || user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized: Only teachers can manage syllabuses' }, { status: 403 });
  }

  const success = deleteSyllabus(id, user.id);
  if (!success) {
    return NextResponse.json(
      { error: 'Cannot delete this syllabus. You can only delete syllabuses you uploaded, not demonstration datasets.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: 'Syllabus deleted successfully' });
}
