import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI Exam Question Predictor — Learn Smart. Teach Better. Prepare Confidently.',
  description:
    'AI-powered education platform helping teachers organize syllabuses into balanced six-session teaching plans and students predict high-yield examination questions directly from teacher-uploaded curricula.',
  keywords: [
    'exam question predictor',
    'AI teaching planner',
    'six session plan',
    'syllabus analysis',
    'university exam questions'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
