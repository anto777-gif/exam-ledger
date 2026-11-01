'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StarRating } from '@/components/StarRating';
import {
  Syllabus,
  MarksCategory,
  QuestionType,
  QuestionDifficulty,
  ImportanceFilter,
  GeneratedQuestion,
  QuestionRequestRecord
} from '@/types';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  Copy,
  Printer,
  RotateCw,
  AlertTriangle,
  Award,
  Layers,
  ChevronDown,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportQuestionsToPdf } from '@/lib/pdfExport';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default function SubjectStudyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const syllabusId = resolvedParams.id;

  const searchParams = useSearchParams();
  const existingRequestId = searchParams.get('requestId');

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [syllabus, setSyllabus] = useState<Syllabus | null>(null);
  const [loading, setLoading] = useState(true);

  // Configuration Form state
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [marks, setMarks] = useState<MarksCategory>(10);
  const [questionType, setQuestionType] = useState<QuestionType>('Theory');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('Medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter>('All');
  const [universityName, setUniversityName] = useState('');

  // Results state
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'configure' | 'results'>('configure');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter in results view
  const [resultDifficultyFilter, setResultDifficultyFilter] = useState<string>('All');

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?role=student');
      } else if (user.role !== 'student') {
        router.push('/teacher');
      } else {
        loadSyllabus();
      }
    }
  }, [user, authLoading, router, syllabusId]);

  const loadSyllabus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/syllabuses/${syllabusId}`);
      if (res.ok) {
        const data = await res.json();
        setSyllabus(data.syllabus);

        // If an existing request ID was provided, fetch question history
        if (existingRequestId) {
          const histRes = await fetch('/api/questions/generate');
          if (histRes.ok) {
            const histData = await histRes.json();
            const record = histData.history?.find((r: QuestionRequestRecord) => r.id === existingRequestId);
            if (record) {
              setQuestions(record.questions);
              setSelectedUnits(record.selectedUnits);
              setSelectedTopics(record.selectedTopics);
              setMarks(record.marks);
              setQuestionType(record.questionType);
              setDifficulty(record.difficulty);
              setActiveTab('results');
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to load syllabus details:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnitSelection = (unitId: string) => {
    setSelectedUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const toggleTopicSelection = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleGenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setGenerating(true);

    try {
      const res = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syllabusId,
          selectedUnits,
          selectedTopics,
          marks,
          questionType,
          difficulty,
          questionCount,
          importanceFilter,
          universityName: universityName || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      setQuestions(data.result.questions);
      setActiveTab('results');

      // Trigger celebrate confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorNotice(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!syllabus) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <Navbar />
        <div className="text-center py-24 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Syllabus Not Found</h2>
          <Link
            href="/student"
            className="text-teal-600 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Student Dashboard
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredQuestions = questions.filter((q) => {
    if (resultDifficultyFilter === 'All') return true;
    return q.difficulty === resultDifficultyFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/student"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Subjects
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('configure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'configure'
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Select Topics & Settings
            </button>
            <button
              onClick={() => setActiveTab('results')}
              disabled={questions.length === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'results'
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40'
              }`}
            >
              2. Predicted Questions ({questions.length})
            </button>
          </div>
        </div>

        {/* Subject Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {syllabus.isDemo ? 'Demonstration Syllabus' : 'Published Teacher Syllabus'}
              </span>
              {syllabus.subjectCode && (
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {syllabus.subjectCode}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{syllabus.subjectName}</h1>
            <p className="text-xs text-slate-500">
              {syllabus.department} • {syllabus.semester} • {syllabus.units.length} Curriculum Units
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-500">Source Grounding</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Syllabus Bound
              </div>
            </div>
          </div>
        </div>

        {errorNotice && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Notice: </span>
              {errorNotice}
            </div>
          </div>
        )}

        {/* TAB 1: CONFIGURE & TOPIC SELECTION */}
        {activeTab === 'configure' && (
          <form onSubmit={handleGenerateQuestions} className="space-y-6">
            {/* Unit & Topic Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 1: Choose Units and Topics to Study
                  </h2>
                  <p className="text-xs text-slate-500">
                    Leave unselected to generate from the whole syllabus, or pick specific focus areas.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnits([]);
                      setSelectedTopics([]);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium underline"
                  >
                    Select Entire Syllabus
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {syllabus.units.map((unit) => {
                  const isUnitSelected = selectedUnits.includes(unit.id);
                  return (
                    <div
                      key={unit.id}
                      className={`border rounded-xl p-4 transition-all ${
                        isUnitSelected ? 'border-teal-500 bg-teal-50/20' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isUnitSelected}
                            onChange={() => toggleUnitSelection(unit.id)}
                            className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                          />
                          <span className="font-bold text-sm text-slate-900">
                            Unit {unit.unitNumber}: {unit.title}
                          </span>
                        </label>
                        <span className="text-xs text-slate-400 font-medium">
                          {unit.topics.length} Topics
                        </span>
                      </div>

                      {/* Topic chips */}
                      <div className="mt-3 pl-6 flex flex-wrap gap-2">
                        {unit.topics.map((topic) => {
                          const isTopicSelected = selectedTopics.includes(topic.id);
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              onClick={() => toggleTopicSelection(topic.id)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                isTopicSelected
                                  ? 'bg-teal-600 text-white shadow-2xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {topic.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Prediction Parameters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-slate-900">
                Step 2: Configure Examination Preferences
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Marks Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Marks Category
                  </label>
                  <select
                    value={marks}
                    onChange={(e) => setMarks(parseInt(e.target.value, 10) as MarksCategory)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value={1}>1 Mark (Short Objective)</option>
                    <option value={2}>2 Marks (Compulsory Definition)</option>
                    <option value={5}>5 Marks (Short Answer)</option>
                    <option value={10}>10 Marks (Major Essay / Analytical)</option>
                    <option value={14}>14 Marks (Terminal Examination)</option>
                    <option value={16}>16 Marks (Comprehensive Terminal Part C)</option>
                  </select>
                </div>

                {/* Question Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Question Type
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Theory">Theory & Exposition</option>
                    <option value="Numerical">Numerical & Mathematical</option>
                    <option value="Programming">Programming & Code</option>
                    <option value="Diagram Based">Diagram Based</option>
                    <option value="Case Study">Case Study & Application</option>
                    <option value="Problem Solving">Problem Solving</option>
                    <option value="Mixed">Mixed Variety</option>
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Easy">Easy (Recall & Definition)</option>
                    <option value="Medium">Medium (Application & Breakdown)</option>
                    <option value="Hard">Hard (Derivation & Proof)</option>
                    <option value="Mixed">Mixed Difficulty</option>
                  </select>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Number of Questions
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions (Recommended)</option>
                    <option value={8}>8 Questions</option>
                    <option value={10}>10 Questions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Importance Filter
                  </label>
                  <select
                    value={importanceFilter}
                    onChange={(e) => setImportanceFilter(e.target.value as ImportanceFilter)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="All">All Predicted Ratings</option>
                    <option value="Medium">Medium & Above (3+ Stars)</option>
                    <option value="High">High & Very High (4+ Stars)</option>
                    <option value="Very High">Very High Priority Only (5 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target University Pattern (Optional)
                  </label>
                  <input
                    type="text"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    placeholder="e.g. State Technological University"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={generating}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing Exam Predictions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Predict Important Exam Questions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: PREDICTED QUESTIONS RESULTS VIEW */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Results Actions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Predicted Important Questions ({filteredQuestions.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Marks: <span className="font-semibold text-slate-800">{marks} Marks</span> •
                  Format: <span className="font-semibold text-slate-800">{questionType}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Difficulty Filter */}
                <select
                  value={resultDifficultyFilter}
                  onChange={(e) => setResultDifficultyFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy Only</option>
                  <option value="Medium">Medium Only</option>
                  <option value="Hard">Hard Only</option>
                </select>

                <button
                  onClick={() => exportQuestionsToPdf(filteredQuestions, syllabus, user?.role === 'teacher' ? 'Teacher' : 'Student')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  Print View
                </button>

                <button
                  onClick={() => setActiveTab('configure')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Reconfigure
                </button>
              </div>
            </div>

            {/* Question Cards List */}
            <div className="space-y-4">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                        Q{q.questionNumber}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                        {q.marks} Marks
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {q.questionType}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          q.difficulty === 'Hard'
                            ? 'bg-red-50 text-red-700'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={q.starRating} size="sm" />
                        <span className="text-xs font-bold text-slate-700">
                          {q.predictedImportance} ({q.scorePercentage}%)
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(q.questionText, q.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                        title="Copy question text"
                      >
                        {copiedId === q.id ? (
                          <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                    {q.questionText}
                  </div>

                  {/* Syllabus Source and Rationale */}
                  <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>
                        <strong className="text-slate-700">Source:</strong> {q.sourceSyllabusRef}
                      </span>
                      <span className="text-slate-400">Score: {q.scorePercentage}/100</span>
                    </div>
                    <p className="text-slate-600 leading-normal">
                      <strong className="text-slate-700">Predictor Rationale:</strong> {q.rationale}
                    </p>

                    {/* Answer Outline Toggle */}
                    {q.suggestedAnswerOutline && q.suggestedAnswerOutline.length > 0 && (
                      <details className="pt-1 group">
                        <summary className="cursor-pointer text-teal-700 font-semibold text-[11px] list-none select-none hover:underline inline-flex items-center gap-1">
                          <span>View Suggested Answer Outline</span>
                          <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="mt-2 pt-2 border-t border-slate-200/60 pl-2 space-y-1 text-slate-700">
                          {q.suggestedAnswerOutline.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
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
