'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StarRating } from '@/components/StarRating';
import { DEMO_SYLLABUSES } from '@/lib/demoData';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Brain,
  HelpCircle,
  GraduationCap,
  Users,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function LandingPage() {
  const samplePlan = DEMO_SYLLABUSES[0]?.teachingPlan;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Driven Curriculum Planner & Exam Prediction Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Your Syllabus. Your Study Plan.{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Your Exam Confidence.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Helping teachers systematically divide course curriculum into structured six-session teaching plans and empowering students with evidence-based examination questions strictly grounded in teacher-uploaded syllabuses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login?role=teacher"
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Users className="w-4 h-4" />
              <span>Login as Teacher</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login?role=student"
              className="w-full sm:w-auto px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Login as Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-Hallucination Source Grounding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>Supports PDF, DOCX & TXT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Tailored 6-Session Academic Plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Tailored Role Capabilities
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Two Specialized Modules for Academic Success
          </h3>
          <p className="text-sm text-slate-600">
            Complete separation of concerns between faculty curriculum management and student exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teacher Module Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">AI Teaching Planner</h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-indigo-600 mt-0.5">
                  Exclusive to Educators & Faculty
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically extracts units, topics, and complexity metrics from course files. Calculates total instructional hours and constructs an organized six-session teaching plan with learning objectives, pedagogical approaches, and classroom discussion questions.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Automatic instructional time & workload estimation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Proactive flagging of topic overloads and dense sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Secure teacher-only upload and syllabus management</span>
                </li>
              </ul>
            </div>
            <Link
              href="/login?role=teacher"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm transition-colors"
            >
              <span>Explore Teacher Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Student Module Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">AI Important Question Predictor</h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-teal-600 mt-0.5">
                  Exclusive to Students
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Students select exact syllabus topics and configure marks (1, 2, 5, 10, 14, or 16), question style, and difficulty. The predictor generates deduplicated, high-yield examination questions with transparent importance scores and answer outlines.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Strict source validation — No out-of-syllabus surprises</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Granular 0–100 heuristic importance scoring & 5-star ratings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Print-ready revision sheets and suggested answer outlines</span>
                </li>
              </ul>
            </div>
            <Link
              href="/login?role=student"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-sm transition-colors"
            >
              <span>Explore Student Predictor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Timeline & Question Preview Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive System Output Previews
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              See the Platform in Action
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Timeline Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-bold text-slate-900">
                    Teaching Plan Timeline Preview
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                  Sample: Software Engineering
                </span>
              </div>

              <div className="space-y-3">
                {samplePlan?.sessions.slice(0, 3).map((s) => (
                  <div
                    key={s.sessionNumber}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700">
                        Session {s.sessionNumber}: {s.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        {s.estimatedDurationMinutes} mins
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-1">
                      <strong>Approach:</strong> {s.teachingApproach}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      <strong>Activity:</strong> {s.suggestedPracticalActivity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/login?role=teacher"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View complete 6-session breakdown in Teacher Portal →
                </Link>
              </div>
            </div>

            {/* Question Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-bold text-slate-900">
                    Predicted Examination Question Preview
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold">
                  Sample: Machine Learning
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-bold text-[10px]">
                      Q1
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold text-[10px] border border-teal-200">
                      10 Marks
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Theory & Derivation
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={5} size="sm" />
                    <span className="text-[11px] font-bold text-slate-700">95% (Very High)</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  Critically analyze Support Vector Machines (SVM). Provide an end-to-end mathematical formulation of the maximum margin hyperplane and illustrate the role of Slack Variables in soft margin optimization.
                </p>

                <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200/70">
                  <strong className="text-slate-700">Source Syllabus:</strong> Unit 2: Supervised Learning • Decision boundaries & maximum margin
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/login?role=student"
                  className="text-xs font-bold text-teal-600 hover:underline"
                >
                  Configure and generate student predictions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Workflow</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">How It Works</h3>
          <p className="text-sm text-slate-600">
            A seamless academic pipeline from raw document parsing to targeted exam revision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base">Teacher Uploads Syllabus</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faculty uploads a PDF, DOCX, or TXT file. The system parses headings, units, and learning goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">AI Analyzes & Plans</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine estimates required instructional workload and builds a tailored six-session schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Student Chooses Focus</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students select specific units, mark weights (1 to 16 marks), and difficulty parameters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-base">Grounded Questions Generated</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deduplicated candidate questions are scored, star-rated, and output with clear syllabus rationales.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstration Syllabuses Browser */}
      <section id="subjects" className="bg-white border-t border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Pre-Loaded Demonstration Curricula
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              8 Standard Computer Science Subjects Ready for Testing
            </h3>
            <p className="text-sm text-slate-600">
              The platform comes equipped with full demonstration units and topics for immediate college evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_SYLLABUSES.map((syl) => (
              <div
                key={syl.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    {syl.subjectCode}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                    Demo
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 truncate">{syl.subjectName}</h4>
                <div className="text-xs text-slate-500">
                  {syl.units.length} Units • {syl.units.reduce((acc, u) => acc + u.topics.length, 0)} Topics
                </div>
                <Link
                  href={`/login?role=student`}
                  className="text-xs font-semibold text-teal-600 hover:underline block pt-1"
                >
                  Study This Syllabus →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
