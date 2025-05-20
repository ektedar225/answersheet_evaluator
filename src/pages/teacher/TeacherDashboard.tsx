import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Plus, 
  Users 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatDate } from '../../lib/utils';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    assessments, 
    submissions, 
    getAssessments, 
    getSubmissions, 
    isLoading 
  } = useAssessmentStore();
  
  useEffect(() => {
    if (user) {
      getAssessments(user.id);
      getSubmissions();
    }
  }, [user, getAssessments, getSubmissions]);
  
  // Filter submissions for current teacher's assessments
  const teacherSubmissions = submissions.filter(submission => 
    assessments.some(a => a.id === submission.assessmentId && a.teacherId === user?.id)
  );
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <Link to="/teacher/assessments/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold">{assessments.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-success-500" />
              </div>
              <div className="text-3xl font-bold">{teacherSubmissions.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle as="h3" className="text-lg text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-accent-500" />
              </div>
              <div className="text-3xl font-bold">
                {teacherSubmissions.length > 0
                  ? `${Math.round(
                      (teacherSubmissions.reduce((sum, s) => sum + s.score, 0) /
                        teacherSubmissions.length) *
                        100
                    ) / 100}%`
                  : 'N/A'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle as="h3">Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't created any assessments yet.</p>
                <Link to="/teacher/assessments/create">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Assessment
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {assessments.slice(0, 5).map((assessment) => (
                  <div 
                    key={assessment.id}
                    className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors"
                  >
                    <Link to={`/teacher/assessments/${assessment.id}`} className="block">
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
                  <Link to="/teacher/assessments">
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
            <CardTitle as="h3">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {teacherSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No submissions received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {teacherSubmissions.slice(0, 5).map((submission) => {
                  const assessment = assessments.find(a => a.id === submission.assessmentId);
                  if (!assessment) return null;
                  
                  return (
                    <div 
                      key={submission.id}
                      className="p-4 border border-gray-100 rounded-md hover:border-gray-200 transition-colors"
                    >
                      <Link to={`/teacher/submissions/${submission.id}`} className="block">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                            {assessment.title}
                          </h4>
                          <span className="text-sm font-medium">
                            {submission.score} / {assessment.totalMarks}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Student {submission.studentId}
                          </span>
                          <span className="text-gray-500">
                            {formatDate(submission.submittedAt)}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                
                <div className="pt-2">
                  <Link to="/teacher/submissions">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Submissions
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

export default TeacherDashboard;