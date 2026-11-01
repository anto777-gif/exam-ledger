'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

function AuthForm() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as 'teacher' | 'student') || 'student';

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'teacher' | 'student'>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'teacher') router.push('/teacher');
      else router.push('/student');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister ? { name, email, password, role } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setQuickDemoCredentials = (targetRole: 'teacher' | 'student') => {
    setIsRegister(false);
    setRole(targetRole);
    if (targetRole === 'teacher') {
      setEmail('teacher@university.edu');
      setPassword('teacher123');
    } else {
      setEmail('student@university.edu');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {isRegister ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-slate-500">
              {isRegister
                ? 'Join to access tailored teaching plans and AI exam predictions'
                : 'Sign in to access your role-specific dashboard'}
            </p>
          </div>

          {/* Quick Demo Autofill Banner */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs space-y-1.5">
            <span className="font-semibold text-indigo-900 block">Demonstration Quick Logins:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setQuickDemoCredentials('teacher')}
                className="px-2.5 py-1 bg-white border border-indigo-200 text-indigo-700 font-semibold rounded-md shadow-2xs hover:bg-indigo-100 transition-colors"
              >
                Log In as Teacher
              </button>
              <button
                type="button"
                onClick={() => setQuickDemoCredentials('student')}
                className="px-2.5 py-1 bg-white border border-teal-200 text-teal-700 font-semibold rounded-md shadow-2xs hover:bg-teal-100 transition-colors"
              >
                Log In as Student
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                        role === 'student'
                          ? 'border-teal-500 bg-teal-50/50 text-teal-800 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                        role === 'teacher'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Teacher
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            {isRegister ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsRegister(false);
                    setError(null);
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setIsRegister(true);
                    setError(null);
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Register new account
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
