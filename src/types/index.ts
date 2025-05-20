export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  totalMarks: number;
  createdAt: Date;
  teacherId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  marks: number;
  correctAnswer: string;
}

export interface Submission {
  id: string;
  assessmentId: string;
  studentId: string;
  submittedAt: Date;
  answers: Answer[];
  score: number;
  evaluated: boolean;
}

export interface Answer {
  questionId: string;
  answer: string;
  correct?: boolean;
  marksAwarded?: number;
}