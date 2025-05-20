import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '../../lib/utils';

const ResultsList: React.FC = () => {
  const { user } = useAuthStore();
  const { submissions, getSubmissions, assessments, getAssessments, isLoading } = useAssessmentStore();
  
  useEffect(() => {
    if (user) {
      getSubmissions(user.id);
      getAssessments();
    }
  }, [user, getSubmissions, getAssessments]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (submissions.length === 0) {
    return (
      <Card className="mt-6 animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No results yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven't submitted any assessments yet. Take an assessment to see your results here.
            </p>
            <Link to="/student/assessments">
              <Button>
                Browse Assessments
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Your Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => {
          const assessment = assessments.find(a => a.id === submission.assessmentId);
          if (!assessment) return null;
          
          const percentage = Math.round((submission.score / assessment.totalMarks) * 100);
          const isPassed = percentage >= 60;
          
          return (
            <Card 
              key={submission.id}
              className="hover:shadow-md transition-shadow duration-200 animate-slide-in"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle as="h3" className="text-lg">
                    {assessment.title}
                  </CardTitle>
                  {isPassed ? (
                    <div className="flex items-center text-success-500">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Passed</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-error-500">
                      <AlertCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Failed</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Submitted on {formatDate(submission.submittedAt)}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-500">Score</div>
                    <div 
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {percentage}%
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {submission.score} / {assessment.totalMarks}
                  </div>
                </div>
                
                <Link to={`/student/results/${submission.id}`}>
                  <Button variant="outline" className="w-full">
                    View Detailed Results
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsList;