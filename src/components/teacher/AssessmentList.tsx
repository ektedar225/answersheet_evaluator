import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, PlusCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '../../lib/utils';

const AssessmentList: React.FC = () => {
  const { user } = useAuthStore();
  const { assessments, getAssessments, isLoading } = useAssessmentStore();
  
  useEffect(() => {
    if (user) {
      getAssessments(user.id);
    }
  }, [user, getAssessments]);
  
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
        <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
        <Link to="/teacher/assessments/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
      
      {assessments.length === 0 ? (
        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start by creating your first assessment. Add questions, set marks, and share with students.
              </p>
              <Link to="/teacher/assessments/create">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Your First Assessment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card 
              key={assessment.id}
              className="hover:shadow-md transition-shadow duration-200 animate-slide-in"
            >
              <CardHeader>
                <CardTitle as="h3" className="text-xl">
                  <Link 
                    to={`/teacher/assessments/${assessment.id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {assessment.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {assessment.description}
                </p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(assessment.createdAt)}</span>
                  </div>
                  <div className="font-medium text-primary-600">
                    {assessment.totalMarks} marks
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link to={`/teacher/assessments/${assessment.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentList;