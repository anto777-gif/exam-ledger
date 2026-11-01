import React from 'react';
import { TeachingPlan } from '@/types';
import { Clock, BookOpen, AlertTriangle, CheckCircle2, ChevronDown, Award } from 'lucide-react';

interface TeachingPlanTimelineProps {
  plan: TeachingPlan;
}

export const TeachingPlanTimeline: React.FC<TeachingPlanTimelineProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      {/* High-level metrics summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-indigo-600" /> Total Units
          </div>
          <div className="text-2xl font-bold text-slate-800">{plan.totalUnitsCount} Units</div>
          <div className="text-xs text-slate-500 mt-1">{plan.totalTopicsCount} key topics extracted</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-teal-600" /> Instructional Workload
          </div>
          <div className="text-2xl font-bold text-slate-800">{plan.estimatedInstructionalHours} Hours</div>
          <div className="text-xs text-slate-500 mt-1">Full curriculum scope</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Estimated Sessions
          </div>
          <div className="text-2xl font-bold text-slate-800">{plan.estimatedSessionsRequired} Sessions</div>
          <div className="text-xs text-slate-500 mt-1">AI standard estimate</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-indigo-600" /> Requested Schedule
          </div>
          <div className="text-2xl font-bold text-indigo-600">{plan.requestedSessions} Sessions</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            {plan.coveragePercentage}% syllabus coverage
          </div>
        </div>
      </div>

      {/* Workload Alert if requested sessions < estimated sessions */}
      {plan.workloadWarning && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Workload Advisory: </span>
            {plan.workloadWarning}
          </div>
        </div>
      )}

      {/* Six-Session Timeline Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
          <span>AI-Optimized Six-Session Teaching Plan</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
            {plan.sessions.length} Planned Sessions
          </span>
        </h3>

        <div className="space-y-4">
          {plan.sessions.map((session) => (
            <details
              key={session.sessionNumber}
              open={session.sessionNumber === 1}
              className="group border border-slate-200 rounded-xl bg-white shadow-xs transition-all overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none hover:bg-slate-50/70 transition-colors">
                <div className="flex items-start md:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                    S{session.sessionNumber}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {session.estimatedDurationMinutes} mins
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          session.difficulty === 'Advanced'
                            ? 'bg-red-50 text-red-700'
                            : session.difficulty === 'Intermediate'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {session.difficulty}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          session.coverageStatus === 'Condensed'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-teal-50 text-teal-700'
                        }`}
                      >
                        {session.coverageStatus} Scope
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {session.title}
                    </h4>
                  </div>
                </div>

                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
              </summary>

              <div className="p-5 pt-1 border-t border-slate-100 bg-slate-50/40 text-sm space-y-4">
                {/* Units & Topics */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Units & Topics Covered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {session.topicsCovered.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pedagogical Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
                      Teaching Approach
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">{session.teachingApproach}</p>
                  </div>

                  {session.suggestedPracticalActivity && (
                    <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                        Suggested Lab / Activity
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">{session.suggestedPracticalActivity}</p>
                    </div>
                  )}
                </div>

                {/* Learning Objectives */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Session Objectives
                  </div>
                  <ul className="space-y-1">
                    {session.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Revision Questions */}
                {session.quickRevisionQuestions.length > 0 && (
                  <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1">
                      Quick Classroom Revision Questions
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                      {session.quickRevisionQuestions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expected Outcome */}
                <div className="text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                  <span className="font-semibold text-slate-700">Expected Outcome: </span>
                  {session.expectedLearningOutcome}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};
