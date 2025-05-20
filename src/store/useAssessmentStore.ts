import { create } from 'zustand';
import { Assessment, Submission, Answer } from '../types';

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Mock data for demo purposes
const mockAssessments: Assessment[] = [
  {
    id: generateUniqueId(),
    title: 'Mathematics Exam',
    description: 'Basic algebra and arithmetic',
    totalMarks: 30,
    createdAt: new Date('2023-09-15'),
    teacherId: '1',
    questions: [
      {
        id: generateUniqueId(),
        text: 'What is 2 + 2?',
        marks: 5,
        correctAnswer: '4',
      },
      {
        id: generateUniqueId(),
        text: 'What is the square root of 16?',
        marks: 10,
        correctAnswer: '4',
      },
      {
        id: generateUniqueId(),
        text: 'Solve for x: 2x + 5 = 13',
        marks: 15,
        correctAnswer: '4',
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: 'Physics Test',
    description: 'Newton\'s laws and basic mechanics',
    totalMarks: 50,
    createdAt: new Date('2023-10-10'),
    teacherId: '1',
    questions: [
      {
        id: generateUniqueId(),
        text: 'What is Newton\'s first law?',
        marks: 20,
        correctAnswer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
      },
      {
        id: generateUniqueId(),
        text: 'What is the formula for force?',
        marks: 15,
        correctAnswer: 'F = ma',
      },
      {
        id: generateUniqueId(),
        text: 'What is the unit of force in SI units?',
        marks: 15,
        correctAnswer: 'Newton',
      },
    ],
  },
];

const mockSubmissions: Submission[] = [];

interface AssessmentState {
  assessments: Assessment[];
  submissions: Submission[];
  currentAssessment: Assessment | null;
  isLoading: boolean;
  error: string | null;

  getAssessments: (teacherId?: string) => Promise<Assessment[]>;
  getAssessmentById: (id: string) => Promise<Assessment | null>;
  createAssessment: (assessment: Omit<Assessment, 'id' | 'createdAt'>) => Promise<Assessment>;
  submitAssessment: (assessmentId: string, studentId: string, answers: Answer[]) => Promise<Submission>;
  submitHandwrittenAssessment: (assessmentId: string, studentId: string) => Promise<Submission>;
  getSubmissions: (studentId?: string, assessmentId?: string) => Promise<Submission[]>;
  evaluateSubmission: (submissionId: string) => Promise<Submission>;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  assessments: mockAssessments,
  submissions: mockSubmissions,
  currentAssessment: null,
  isLoading: false,
  error: null,

  getAssessments: async (teacherId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const assessments = teacherId
        ? mockAssessments.filter(a => a.teacherId === teacherId)
        : mockAssessments;
      set({ assessments, isLoading: false });
      return assessments;
    } catch (error) {
      set({ error: 'Failed to fetch assessments', isLoading: false });
      return [];
    }
  },

  getAssessmentById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const assessment = mockAssessments.find(a => a.id === id) || null;
      set({ currentAssessment: assessment, isLoading: false });
      return assessment;
    } catch (error) {
      set({ error: 'Failed to fetch assessment', isLoading: false });
      return null;
    }
  },

  createAssessment: async (assessmentData) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Ensure all questions have unique, non-empty string IDs
      const questionsWithIds = assessmentData.questions.map(q => ({
        ...q,
        id: q.id && q.id.trim() !== '' ? q.id : generateUniqueId(),
      }));
      const newAssessment: Assessment = {
        ...assessmentData,
        id: generateUniqueId(),
        createdAt: new Date(),
        questions: questionsWithIds,
      };
      mockAssessments.push(newAssessment);
      set({ assessments: [...mockAssessments], isLoading: false });
      return newAssessment;
    } catch (error) {
      set({ error: 'Failed to create assessment', isLoading: false });
      throw error;
    }
  },

  submitAssessment: async (assessmentId, studentId, answers) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const assessment = mockAssessments.find(a => a.id === assessmentId);
      if (!assessment) throw new Error('Assessment not found');
      const newSubmission: Submission = {
        id: `${mockSubmissions.length + 1}`,
        assessmentId,
        studentId,
        submittedAt: new Date(),
        answers,
        score: 0,
        evaluated: false,
      };
      mockSubmissions.push(newSubmission);
      const evaluatedSubmission = await get().evaluateSubmission(newSubmission.id);
      set({ submissions: [...mockSubmissions], isLoading: false });
      return evaluatedSubmission;
    } catch (error) {
      set({ error: 'Failed to submit assessment', isLoading: false });
      throw error;
    }
  },

  submitHandwrittenAssessment: async (assessmentId: string, studentId: string) => {
    set({ isLoading: true, error: null });
    try {
      const assessment = mockAssessments.find(a => a.id === assessmentId);
      if (!assessment) throw new Error('Assessment not found');

      // MOCK: Prompt user for answer key (simulate with window.prompt for demo)
      let answerKey = '';
      if (typeof window !== 'undefined') {
        answerKey = window.prompt('Enter your answer key for evaluation (mock):', '') || '';
      }

      // Generate random percentage between 40 and 60
      const percentage = Math.floor(Math.random() * 21) + 40;
      const totalMarks = assessment.totalMarks;
      const score = Math.round((percentage / 100) * totalMarks);

      // Mark all answers as correct/incorrect randomly for demo
      const answers = assessment.questions.map((question) => ({
        questionId: question.id,
        answer: answerKey ? answerKey : 'Mocked answer',
        correct: Math.random() > 0.5,
        marksAwarded: Math.random() > 0.5 ? question.marks : 0,
      }));

      const newSubmission: Submission = {
        id: `${mockSubmissions.length + 1}`,
        assessmentId,
        studentId,
        submittedAt: new Date(),
        answers,
        score,
        evaluated: true,
      };
      mockSubmissions.push(newSubmission);
      set({ submissions: [...mockSubmissions], isLoading: false });
      return newSubmission;
    } catch (error) {
      set({ error: 'Failed to evaluate handwritten submission', isLoading: false });
      throw error;
    }
  },

  getSubmissions: async (studentId, assessmentId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      let submissions = [...mockSubmissions];
      if (studentId) submissions = submissions.filter(s => s.studentId === studentId);
      if (assessmentId) submissions = submissions.filter(s => s.assessmentId === assessmentId);
      set({ submissions, isLoading: false });
      return submissions;
    } catch (error) {
      set({ error: 'Failed to fetch submissions', isLoading: false });
      return [];
    }
  },

  evaluateSubmission: async (submissionId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const submissionIndex = mockSubmissions.findIndex(s => s.id === submissionId);
      if (submissionIndex === -1) throw new Error('Submission not found');
      const submission = mockSubmissions[submissionIndex];
      const assessment = mockAssessments.find(a => a.id === submission.assessmentId);
      if (!assessment) throw new Error('Assessment not found');
      let totalScore = 0;
      const evaluatedAnswers: Answer[] = submission.answers.map(answer => {
        const question = assessment.questions.find(q => q.id === answer.questionId);
        if (!question) return answer;
        const isCorrect = answer.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
        const marksAwarded = isCorrect ? question.marks : 0;
        totalScore += marksAwarded;
        return {
          ...answer,
          correct: isCorrect,
          marksAwarded,
        };
      });
      const evaluatedSubmission: Submission = {
        ...submission,
        answers: evaluatedAnswers,
        score: totalScore,
        evaluated: true,
      };
      mockSubmissions[submissionIndex] = evaluatedSubmission;
      set({ submissions: [...mockSubmissions], isLoading: false });
      return evaluatedSubmission;
    } catch (error) {
      set({ error: 'Failed to evaluate submission', isLoading: false });
      throw error;
    }
  },
}));