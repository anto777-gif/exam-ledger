'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeachingPlanTimeline } from '@/components/TeachingPlanTimeline';
import { Syllabus } from '@/types';
import {
  Upload,
  BookOpen,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  FileText,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Download,
  HelpCircle
} from 'lucide-react';
import { exportQuestionsToPdf } from '@/lib/pdfExport';
import { GeneratedQuestion } from '@/types';

export default function TeacherDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState<Syllabus | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Upload modal / form state
  const [isUploading, setIsUploading] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [semester, setSemester] = useState('6th Semester');
  const [university, setUniversity] = useState('');
  const [requestedSessions, setRequestedSessions] = useState(6);
  const [directText, setDirectText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Teacher Question Generation modal & state
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [teacherQuestions, setTeacherQuestions] = useState<GeneratedQuestion[]>([]);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [questionMarks, setQuestionMarks] = useState<number>(10);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questionType, setQuestionType] = useState<string>('Theory');
  const [questionDifficulty, setQuestionDifficulty] = useState<string>('Medium');
  const [questionNotice, setQuestionNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?role=teacher');
      } else if (user.role !== 'teacher') {
        router.push('/student');
      } else {
        fetchTeacherSyllabuses();
      }
    }
  }, [user, authLoading, router]);

  const fetchTeacherSyllabuses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/syllabuses');
      if (res.ok) {
        const data = await res.json();
        const list = data.allVisible || [];
        setSyllabuses(list);
        if (list.length > 0 && !selectedSyllabus) {
          setSelectedSyllabus(list[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch teacher syllabuses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccess(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('subjectName', subjectName);
      if (subjectCode) formData.append('subjectCode', subjectCode);
      if (department) formData.append('department', department);
      if (semester) formData.append('semester', semester);
      if (university) formData.append('university', university);
      formData.append('requestedSessions', requestedSessions.toString());
      if (directText) formData.append('directText', directText);
      if (selectedFile) formData.append('file', selectedFile);

      const res = await fetch('/api/syllabuses', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process syllabus upload');
      }

      setUploadSuccess('Syllabus successfully parsed and 6-session teaching plan generated!');
      // Reset form
      setSubjectName('');
      setSubjectCode('');
      setDirectText('');
      setSelectedFile(null);
      setIsUploading(false);

      // Refresh list
      await fetchTeacherSyllabuses();
      setSelectedSyllabus(data.syllabus);
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTeacherGenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSyllabus) return;
    setGeneratingQuestions(true);
    setQuestionNotice(null);

    try {
      const res = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syllabusId: selectedSyllabus.id,
          selectedUnits: [],
          selectedTopics: [],
          marks: questionMarks,
          questionType,
          difficulty: questionDifficulty,
          questionCount,
          importanceFilter: 'All'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      setTeacherQuestions(data.result.questions || []);
    } catch (err: any) {
      setQuestionNotice(err.message);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleDeleteSyllabus = async (id: string) => {
    if (!confirm('Are you sure you want to delete this uploaded syllabus?')) return;

    try {
      const res = await fetch(`/api/syllabuses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete');
        return;
      }
      if (selectedSyllabus?.id === id) {
        setSelectedSyllabus(null);
      }
      fetchTeacherSyllabuses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredSyllabuses = syllabuses.filter(
    (s) =>
      s.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subjectCode && s.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (authLoading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                Teacher Command Center
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Curriculum & Teaching Planner</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Welcome, {user?.name}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Upload course syllabuses to automatically calculate instructional workloads and construct a structured six-session teaching plan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploading(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload New Syllabus
            </button>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 text-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{uploadSuccess}</span>
            </div>
            <button
              onClick={() => setUploadSuccess(null)}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Upload Modal Drawer */}
        {isUploading && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Upload & Analyze Course Syllabus</h2>
                  <p className="text-xs text-slate-500">
                    Supports PDF, DOCX, TXT documents, or direct curriculum text pasting.
                  </p>
                </div>
                <button
                  onClick={() => setIsUploading(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      placeholder="e.g. Distributed Cloud Computing"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={subjectCode}
                      onChange={(e) => setSubjectCode(e.target.value)}
                      placeholder="e.g. CS702"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Computer Science & Engineering"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
                    <input
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      placeholder="6th Semester"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teaching Plan Target Sessions (Default: 6)
                  </label>
                  <select
                    value={requestedSessions}
                    onChange={(e) => setRequestedSessions(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value={6}>6 Sessions (Standard Default Teaching Plan)</option>
                    <option value={8}>8 Sessions</option>
                    <option value={10}>10 Sessions</option>
                    <option value={12}>12 Sessions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Document (PDF, DOCX, TXT)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Or Paste Syllabus Text Direct
                  </label>
                  <textarea
                    rows={5}
                    value={directText}
                    onChange={(e) => setDirectText(e.target.value)}
                    placeholder={`Unit 1: Cloud Principles and Virtualization\n- Hypervisors, Containerization, Docker\n\nUnit 2: Distributed Storage and Consensus\n- Raft, Paxos, Replication`}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsUploading(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Process & Generate Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Teacher Important Question Generation Modal */}
        {isQuestionModalOpen && selectedSyllabus && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                      AI Important Question Generator
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{selectedSyllabus.subjectCode}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {selectedSyllabus.subjectName} — Important Exam Questions
                  </h2>
                </div>
                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {questionNotice && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
                  {questionNotice}
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleTeacherGenerateQuestions} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Marks Category
                    </label>
                    <select
                      value={questionMarks}
                      onChange={(e) => setQuestionMarks(parseInt(e.target.value, 10))}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value={2}>2 Marks</option>
                      <option value={5}>5 Marks</option>
                      <option value={10}>10 Marks</option>
                      <option value={14}>14 Marks</option>
                      <option value={16}>16 Marks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Question Type
                    </label>
                    <select
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Theory">Theory</option>
                      <option value="Numerical">Numerical</option>
                      <option value="Programming">Programming</option>
                      <option value="Diagram Based">Diagram Based</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Problem Solving">Problem Solving</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={questionDifficulty}
                      onChange={(e) => setQuestionDifficulty(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Count
                    </label>
                    <select
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value={3}>3 Questions</option>
                      <option value={5}>5 Questions</option>
                      <option value={8}>8 Questions</option>
                      <option value={10}>10 Questions</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Questions are derived exclusively from the uploaded syllabus content.
                  </span>
                  <button
                    type="submit"
                    disabled={generatingQuestions}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {generatingQuestions ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Generate Questions</span>
                  </button>
                </div>
              </form>

              {/* Questions List & PDF Download */}
              {teacherQuestions.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">
                      Generated {teacherQuestions.length} Important Questions ({questionMarks} Marks)
                    </span>
                    <button
                      onClick={() => exportQuestionsToPdf(teacherQuestions, selectedSyllabus, 'Teacher')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download as PDF
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {teacherQuestions.map((q) => (
                      <div key={q.id} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                              Q{q.questionNumber}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold">
                              {q.marks} Marks
                            </span>
                            <span className="text-slate-500 font-medium">{q.questionType}</span>
                          </div>
                          <span className="font-bold text-slate-700">
                            {q.predictedImportance} ({q.scorePercentage}%)
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 leading-snug">{q.questionText}</p>
                        <p className="text-[11px] text-slate-500 italic">Source: {q.sourceSyllabusRef}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Syllabus List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Available Syllabuses
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {syllabuses.length}
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search subject or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="text-center py-8 text-xs text-slate-400">Loading syllabuses...</div>
                ) : filteredSyllabuses.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">No syllabuses found.</div>
                ) : (
                  filteredSyllabuses.map((syl) => {
                    const isSelected = selectedSyllabus?.id === syl.id;
                    return (
                      <div
                        key={syl.id}
                        onClick={() => setSelectedSyllabus(syl)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              {syl.isDemo ? (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                  Demo
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                  Teacher Upload
                                </span>
                              )}
                              {syl.subjectCode && (
                                <span className="text-[11px] font-mono text-slate-500">
                                  {syl.subjectCode}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 truncate mt-1">
                              {syl.subjectName}
                            </h3>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {syl.units?.length || 0} Units • {syl.semester || 'Academic Syllabus'}
                            </div>
                          </div>

                          {!syl.isDemo && syl.userId === user?.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSyllabus(syl.id);
                              }}
                              title="Delete this uploaded syllabus"
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-white transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Syllabus Analysis & Teaching Plan */}
          <div className="lg:col-span-8 space-y-6">
            {selectedSyllabus ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                {/* Syllabus Subject Card */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {selectedSyllabus.isDemo ? 'Demonstration Curriculum' : 'Active Teacher Syllabus'}
                      </span>
                      {selectedSyllabus.subjectCode && (
                        <span className="text-xs font-mono text-slate-500">
                          Code: {selectedSyllabus.subjectCode}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedSyllabus.subjectName}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedSyllabus.department} • {selectedSyllabus.semester}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Status: {selectedSyllabus.status}
                    </span>

                    <button
                      onClick={() => {
                        setIsQuestionModalOpen(true);
                        setTeacherQuestions([]);
                        setQuestionNotice(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Get Important Questions
                    </button>
                  </div>
                </div>

                {/* Display 6-Session Teaching Plan */}
                {selectedSyllabus.teachingPlan ? (
                  <TeachingPlanTimeline plan={selectedSyllabus.teachingPlan} />
                ) : (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    No teaching plan generated yet for this syllabus.
                  </div>
                )}

                {/* Syllabus Unit Outline */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Extracted Syllabus Units & Topics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSyllabus.units.map((unit) => (
                      <div
                        key={unit.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs"
                      >
                        <div className="font-bold text-slate-800">
                          Unit {unit.unitNumber}: {unit.title}
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          {unit.topics.map((t) => (
                            <li key={t.id} className="truncate">
                              {t.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 shadow-xs">
                Select a syllabus from the left panel or click Upload New Syllabus to view its 6-session teaching plan.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
