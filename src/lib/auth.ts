import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { getUserById } from './db';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'ai-exam-predictor-production-secret-key-2026-secure';

export interface DecodedToken {
  userId: string;
  role: 'teacher' | 'student';
  email: string;
  iat: number;
  exp: number;
}

export function signToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (err) {
    return null;
  }
}

export function getAuthUserFromRequest(request: NextRequest): User | null {
  // Check authorization header or auth-token cookie
  const authHeader = request.headers.get('authorization');
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = request.cookies.get('auth_token')?.value;
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = getUserById(decoded.userId);
  if (!user) return null;

  return user;
}
