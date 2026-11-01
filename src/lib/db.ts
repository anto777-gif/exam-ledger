import fs from 'fs';
import path from 'path';
import { User, Syllabus, QuestionRequestRecord } from '@/types';
import { DEMO_SYLLABUSES } from './demoData';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SYLLABUSES_FILE = path.join(DATA_DIR, 'syllabuses.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'requests.json');

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  ensureDirectoryExists();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  ensureDirectoryExists();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Initialize seed users and seed syllabuses if empty
export function initializeStorage(): void {
  ensureDirectoryExists();

  // Users
  const users = readJsonFile<User[]>(USERS_FILE, []);
  if (users.length === 0) {
    const defaultTeacherHash = bcrypt.hashSync('teacher123', 10);
    const defaultStudentHash = bcrypt.hashSync('student123', 10);

    const initialUsers: User[] = [
      {
        id: 'usr-teacher-1',
        name: 'Prof. Alan Turing',
        email: 'teacher@university.edu',
        role: 'teacher',
        passwordHash: defaultTeacherHash,
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr-student-1',
        name: 'Ada Lovelace',
        email: 'student@university.edu',
        role: 'student',
        passwordHash: defaultStudentHash,
        createdAt: new Date().toISOString()
      }
    ];
    writeJsonFile(USERS_FILE, initialUsers);
  }

  // Syllabuses
  const storedSyllabuses = readJsonFile<Syllabus[]>(SYLLABUSES_FILE, []);
  if (storedSyllabuses.length === 0) {
    writeJsonFile(SYLLABUSES_FILE, DEMO_SYLLABUSES);
  }
}

// User operations
export function getAllUsers(): User[] {
  initializeStorage();
  return readJsonFile<User[]>(USERS_FILE, []);
}

export function getUserByEmail(email: string): User | undefined {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const users = getAllUsers();
  return users.find((u) => u.id === id);
}

export function createUser(user: User): User {
  const users = getAllUsers();
  users.push(user);
  writeJsonFile(USERS_FILE, users);
  return user;
}

// Syllabus operations
export function getAllSyllabuses(): Syllabus[] {
  initializeStorage();
  return readJsonFile<Syllabus[]>(SYLLABUSES_FILE, DEMO_SYLLABUSES);
}

export function getSyllabusById(id: string): Syllabus | undefined {
  const all = getAllSyllabuses();
  return all.find((s) => s.id === id);
}

export function getSyllabusesByTeacherId(teacherId: string): Syllabus[] {
  const all = getAllSyllabuses();
  return all.filter((s) => s.userId === teacherId);
}

export function getPublishedSyllabuses(): Syllabus[] {
  const all = getAllSyllabuses();
  return all.filter((s) => s.status === 'Completed' || s.isDemo);
}

export function saveSyllabus(syllabus: Syllabus): Syllabus {
  const all = getAllSyllabuses();
  const index = all.findIndex((s) => s.id === syllabus.id);
  if (index >= 0) {
    all[index] = syllabus;
  } else {
    all.unshift(syllabus);
  }
  writeJsonFile(SYLLABUSES_FILE, all);
  return syllabus;
}

export function deleteSyllabus(id: string, teacherId: string): boolean {
  const all = getAllSyllabuses();
  const target = all.find((s) => s.id === id);
  if (!target) return false;
  // Teachers can only delete their own non-demo syllabuses
  if (target.userId !== teacherId && !target.isDemo) return false;
  if (target.isDemo) return false; // Prevent deleting seeded demo syllabuses

  const filtered = all.filter((s) => s.id !== id);
  writeJsonFile(SYLLABUSES_FILE, filtered);
  return true;
}

// Question Requests operations
export function getAllQuestionRequests(): QuestionRequestRecord[] {
  initializeStorage();
  return readJsonFile<QuestionRequestRecord[]>(REQUESTS_FILE, []);
}

export function getQuestionRequestsByStudent(studentId: string): QuestionRequestRecord[] {
  const all = getAllQuestionRequests();
  return all.filter((r) => r.studentId === studentId);
}

export function getQuestionRequestById(id: string): QuestionRequestRecord | undefined {
  const all = getAllQuestionRequests();
  return all.find((r) => r.id === id);
}

export function saveQuestionRequest(record: QuestionRequestRecord): QuestionRequestRecord {
  const all = getAllQuestionRequests();
  const index = all.findIndex((r) => r.id === record.id);
  if (index >= 0) {
    all[index] = record;
  } else {
    all.unshift(record);
  }
  writeJsonFile(REQUESTS_FILE, all);
  return record;
}
