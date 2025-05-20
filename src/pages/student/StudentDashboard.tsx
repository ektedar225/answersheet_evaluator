import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  FileText, 
  Play, 
  XCircle 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatDate } from '../../lib/utils';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    assessments, 
    submissions, 
    getAssessments, 
    getSubmissions, 
    isLoading 
  } = useAssessmentStore();
  
  useEffect(() => {
    getAssessments();
    if (user) {
      getSubmissions(user.id);
    }
  }, [user, getAssessments, getSubmissions]);
  
  // Calculate completed and pending assessments
  const completedAssessmentIds = submissions.map(s => s.assessmentId);
  const pendingAssessments = assessments.filter(a => !completedAssessmentIds.includes(a.id));
  
  // Calculate average score
  const averageScore = submissions.length > 0
    ? Math.round((submissions.reduce((sum, s) => sum + s.score, 0) / 
        submissions.reduce((sum, s) => {
          const assessment = assessments.find(a => a.id === s.assessmentId);
          return sum + (assessment?.totalMarks || 0);
        }, 0)) * 100)
    : 0;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Pending Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold">{pendingAssessments.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Completed Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-success-500" />
              </div>
              <div className="text-3xl font-bold">{submissions.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full">
                <Play className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold">
                {submissions.length > 0 ? `${averageScore}%` : 'N/A'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle as="h3">Available Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingAssessments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending assessments. You've completed all available assessments!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAssessments.slice(0, 5).map((assessment) => (
                  <div 
                    key={assessment.id}
                    className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors"
                  >
                    <Link to={`/student/assessments/${assessment.id}`} className="block">
                      <h4 className="font-medium text-gray-900 hover:text-primary-600 transition-colors mb-1">
                        {assessment.title}
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {formatDate(assessment.createdAt)}
                        </span>
                        <span className="font-medium text-primary-600">
                          {assessment.totalMarks} marks
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
                
                <div className="pt-2">
                  <Link to="/student/assessments">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Assessments
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle as="h3">Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't completed any assessments yet.</p>
                <Link to="/student/assessments">
                  <Button size="sm">
                    Take Your First Assessment
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.slice(0, 5).map((submission) => {
                  const assessment = assessments.find(a => a.id === submission.assessmentId);
                  if (!assessment) return null;
                  
                  const percentage = Math.round((submission.score / assessment.totalMarks) * 100);
                  const isPassed = percentage >= 60;
                  
                  return (
                    <div 
                      key={submission.id}
                      className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors"
                    >
                      <Link to={`/student/results/${submission.id}`} className="block">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                            {assessment.title}
                          </h4>
                          <div className="flex items-center">
                            {isPassed ? (
                              <CheckCircle className="h-4 w-4 text-success-500 mr-1" />
                            ) : (
                              <XCircle className="h-4 w-4 text-error-500 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${
                              isPassed ? 'text-success-500' : 'text-error-500'
                            }`}>
                              {percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {formatDate(submission.submittedAt)}
                          </span>
                          <span className="text-gray-700">
                            {submission.score} / {assessment.totalMarks}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                
                <div className="pt-2">
                  <Link to="/student/results">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Results
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;