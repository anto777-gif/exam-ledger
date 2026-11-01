'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Syllabus, QuestionRequestRecord } from '@/types';
import {
  BookOpen,
  Search,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Layers,
  History,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
  const [history, setHistory] = useState<QuestionRequestRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?role=student');
      } else if (user.role !== 'student') {
        router.push('/teacher');
      } else {
        fetchStudentData();
      }
    }
  }, [user, authLoading, router]);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      // 1. Fetch available published & demo syllabuses
      const sylRes = await fetch('/api/syllabuses?role=student');
      if (sylRes.ok) {
        const data = await sylRes.json();
        setSyllabuses(data.syllabuses || []);
      }

      // 2. Fetch student generation history
      const histRes = await fetch('/api/questions/generate');
      if (histRes.ok) {
        const histData = await histRes.json();
        setHistory(histData.history || []);
      }
    } catch (err) {
      console.error('Failed to load student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSyllabuses = syllabuses.filter(
    (s) =>
      s.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subjectCode && s.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.department && s.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (authLoading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-xs border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Exam Question Predictor • Student Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Study Smart with High-Yield Questions
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Select any course syllabus below to configure topic-specific exam question predictions. Every question is strictly verified against teacher-approved curriculum units.
            </p>
          </div>
        </div>

        {/* Search & Subject Browser */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Available Course Syllabuses</h2>
              <p className="text-xs text-slate-500">
                Browse official demonstration syllabuses and live teacher uploads.
              </p>
            </div>

            <div className="relative sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject by title or code..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-44 bg-slate-200/60 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredSyllabuses.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              No subjects found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredSyllabuses.map((syllabus) => (
                <div
                  key={syllabus.id}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          syllabus.isDemo
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {syllabus.isDemo ? 'Demo Curriculum' : 'Teacher Uploaded'}
                      </span>
                      {syllabus.subjectCode && (
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          {syllabus.subjectCode}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {syllabus.subjectName}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {syllabus.department || 'Computer Science & Engineering'} •{' '}
                      {syllabus.semester || 'Academic Syllabus'}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-teal-600" />
                        {syllabus.units?.length || 0} Units
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {syllabus.units?.reduce((acc, u) => acc + u.topics.length, 0) || 0} Topics
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-2">
                    <Link
                      href={`/student/subject/${syllabus.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 font-semibold text-xs transition-colors"
                    >
                      <span>Study Important Questions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Prediction History Section */}
        {history.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg font-bold text-slate-900">Your Recent Question Sets</h2>
              </div>
              <span className="text-xs text-slate-500">{history.length} Saved Requests</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.slice(0, 6).map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate">{req.subjectName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                      {req.marks} Marks
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100">
                      {req.questionType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100">
                      {req.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-medium">
                      {req.questions?.length || 0} Questions
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/student/subject/${req.syllabusId}?requestId=${req.id}`}
                      className="text-teal-600 hover:underline font-semibold text-xs"
                    >
                      Revisit Questions →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
