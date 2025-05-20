import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

const AssessmentForm: React.FC = () => {
  const { user } = useAuthStore();
  const { createAssessment, isLoading, error } = useAssessmentStore();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [questions, setQuestions] = useState([
    { id: '1', text: '', marks: 0, correctAnswer: '' },
  ]);
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `${questions.length + 1}`,
        text: '',
        marks: 0,
        correctAnswer: '',
      },
    ]);
  };
  
  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };
  
  const updateQuestion = (index: number, field: string, value: string | number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };
  
  const calculateTotalMarks = () => {
    return questions.reduce((total, question) => total + Number(question.marks), 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return;
    }
    
    try {
      await createAssessment({
        title,
        description,
        totalMarks: calculateTotalMarks(),
        teacherId: user.id,
        questions,
      });
      
      navigate('/teacher/assessments');
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Create New Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-error-500 text-sm">{error}</div>
          )}
          
          <div className="space-y-4">
            <Input
              label="Assessment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Midterm Exam, Quiz 1"
              required
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for this assessment..."
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 min-h-[100px]"
                required
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>
            
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="p-4 border border-gray-200 rounded-md bg-white shadow-sm animate-slide-up"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium">Question {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-gray-500 hover:text-error-500 transition-colors"
                      disabled={questions.length === 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Question Text
                      </label>
                      <textarea
                        value={question.text}
                        onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                        placeholder="Enter the question..."
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Marks"
                        type="number"
                        min="1"
                        value={question.marks.toString()}
                        onChange={(e) => updateQuestion(index, 'marks', parseInt(e.target.value) || 0)}
                        required
                      />
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Correct Answer
                        </label>
                        <textarea
                          value={question.correctAnswer}
                          onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                          placeholder="Enter the correct answer..."
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={addQuestion}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm font-medium">
              Total Marks: <span className="text-primary-600">{calculateTotalMarks()}</span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/teacher/assessments')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          isLoading={isLoading}
        >
          Create Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentForm;