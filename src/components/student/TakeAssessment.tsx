import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Answer } from '../../types';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card';
import AnswerSheetUpload from './AnswerSheetUpload';

const TakeAssessment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    getAssessmentById, 
    currentAssessment, 
    submitAssessment,
    submitHandwrittenAssessment, 
    isLoading,
    error
  } = useAssessmentStore();
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    score: number;
    totalMarks: number;
    answers: Answer[];
  } | null>(null);
  
  useEffect(() => {
    if (id) {
      getAssessmentById(id);
    }
  }, [id, getAssessmentById]);
  
  useEffect(() => {
    if (currentAssessment) {
      setAnswers(
        currentAssessment.questions.map((question) => ({
          questionId: question.id,
          answer: '',
        }))
      );
    }
  }, [currentAssessment]);
  
  const updateAnswer = (questionId: string, value: string) => {
    setAnswers(
      answers.map((answer) =>
        answer.questionId === questionId ? { ...answer, answer: value } : answer
      )
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !currentAssessment || !id) return;
    
    setSubmitting(true);
    
    try {
      const result = await submitAssessment(id, user.id, answers);
      
      setIsSubmitted(true);
      setSubmissionResult({
        score: result.score,
        totalMarks: currentAssessment.totalMarks,
        answers: result.answers,
      });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!user || !currentAssessment || !id) return;

    setIsUploading(true);

    try {
      const result = await submitHandwrittenAssessment(id, user.id, file);
      
      setIsSubmitted(true);
      setSubmissionResult({
        score: result.score,
        totalMarks: currentAssessment.totalMarks,
        answers: result.answers,
      });
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!currentAssessment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Assessment not found</h2>
        <p className="text-gray-500 mb-6">The assessment you're looking for doesn't exist or has been removed.</p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/student/assessments')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
      </div>
    );
  }
  
  if (isSubmitted && submissionResult) {
    const percentage = Math.round((submissionResult.score / submissionResult.totalMarks) * 100);
    const isPassed = percentage >= 60;
    
    return (
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {isPassed ? (
                <CheckCircle className="h-16 w-16 text-success-500" />
              ) : (
                <AlertCircle className="h-16 w-16 text-error-500" />
              )}
            </div>
            <CardTitle as="h2" className="text-2xl">
              {isPassed ? 'Congratulations!' : 'Assessment Completed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">
                {submissionResult.score} / {submissionResult.totalMarks}
              </div>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {percentage}%
              </div>
            </div>
            
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-medium border-b pb-2">Your Answers</h3>
              
              {currentAssessment.questions.map((question, index) => {
                const answer = submissionResult.answers.find(a => a.questionId === question.id);
                const isCorrect = answer?.correct;
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-md ${
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <div className="text-sm font-medium">
                        {answer?.marksAwarded} / {question.marks} marks
                      </div>
                    </div>
                    <p className="mb-4 text-gray-800">{question.text}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Your Answer:</div>
                        <div className="p-2 bg-white rounded mt-1">
                          {answer?.answer || 'No answer provided'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Correct Answer:</div>
                        <div className="p-2 bg-white rounded mt-1">
                          {question.correctAnswer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => navigate('/student/assessments')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessments
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{currentAssessment.title}</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/student/assessments')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle as="h3">Assessment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{currentAssessment.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Marks</div>
              <div className="text-xl font-bold text-gray-900">{currentAssessment.totalMarks}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500 mb-1">Questions</div>
              <div className="text-xl font-bold text-gray-900">{currentAssessment.questions.length}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm font-medium text-gray-500 mb-1">Time Limit</div>
              <div className="text-xl font-bold text-gray-900">Unlimited</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Submit Your Answers</h3>
          <div className="text-sm text-gray-500">Choose your submission method</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle as="h3">Type Your Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {currentAssessment.questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Question {index + 1} ({question.marks} marks)
                      </label>
                      <p className="text-gray-800 mb-2">{question.text}</p>
                      <textarea
                        value={answers.find((a) => a.questionId === question.id)?.answer || ''}
                        onChange={(e) => updateAnswer(question.id, e.target.value)}
                        placeholder="Type your answer here..."
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 min-h-[120px]"
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="submit"
                    isLoading={submitting}
                    disabled={submitting}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Typed Answers
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <AnswerSheetUpload
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAssessment;