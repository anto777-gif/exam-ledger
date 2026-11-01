'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';
import {
  LogOut,
  User,
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#subjects"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Demo Syllabuses
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Link
                href={user.role === 'teacher' ? '/teacher' : '/student'}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {user.role === 'teacher' ? 'Teacher Dashboard' : 'Student Portal'}
              </Link>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <User className="w-3.5 h-3.5" />
                </span>
                <span className="hidden lg:inline">{user.name}</span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login?role=student"
                className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Student Sign In
              </Link>
              <Link
                href="/login?role=teacher"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-xs transition-colors"
              >
                Teacher Portal
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <Link
              href={user.role === 'teacher' ? '/teacher' : '/student'}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            How It Works
          </Link>
          <Link
            href="/#subjects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700"
          >
            Demonstration Syllabuses
          </Link>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-xs text-slate-500 font-medium">
                  Signed in as <span className="text-slate-800 font-bold">{user.name}</span> ({user.role})
                </div>
                <Link
                  href={user.role === 'teacher' ? '/teacher' : '/student'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-sm font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Go to {user.role === 'teacher' ? 'Teacher' : 'Student'} Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login?role=student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-sm font-semibold rounded-lg border border-slate-300 text-slate-700"
                >
                  Student Sign In
                </Link>
                <Link
                  href="/login?role=teacher"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-sm font-semibold rounded-lg bg-indigo-600 text-white"
                >
                  Teacher Portal
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
