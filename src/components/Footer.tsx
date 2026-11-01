import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ShieldCheck, Info, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              AI Exam Question Predictor empowers educators to systematically structure course syllabuses into balanced six-session teaching plans and provides students with evidence-based exam revision questions mapped strictly to teacher-uploaded curriculum.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict source boundary enforcement — Zero out-of-syllabus hallucination</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/#features" className="hover:text-indigo-600 transition-colors">
                  System Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/login?role=teacher" className="hover:text-indigo-600 transition-colors">
                  Teacher Upload Portal
                </Link>
              </li>
              <li>
                <Link href="/login?role=student" className="hover:text-indigo-600 transition-colors">
                  Student Question Predictor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              College Demonstration
            </h4>
            <div className="text-xs text-slate-600 space-y-2">
              <p>
                Equipped with 8 pre-seeded computer science subjects and offline deterministic fallback mode for live evaluation.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800">Demo Accounts:</span>
                <div className="mt-1 text-[11px] text-slate-600">
                  Teacher: <code className="text-indigo-600 font-mono">teacher@university.edu</code> (pw: <code className="font-mono">teacher123</code>)
                </div>
                <div className="text-[11px] text-slate-600">
                  Student: <code className="text-teal-600 font-mono">student@university.edu</code> (pw: <code className="font-mono">student123</code>)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              <strong>Responsible AI Disclaimer:</strong> Question predictions and importance scores represent curriculum-derived heuristic estimates, not guaranteed university exam papers.
            </span>
          </div>
          <div className="text-right shrink-0">
            © 2026 AI Exam Question Predictor. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
