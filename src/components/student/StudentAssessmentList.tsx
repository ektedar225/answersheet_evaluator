import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Clock, FileText } from 'lucide-react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '../../lib/utils';

const StudentAssessmentList: React.FC = () => {
  const { assessments, getAssessments, isLoading } = useAssessmentStore();
  
  useEffect(() => {
    getAssessments();
  }, [getAssessments]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (assessments.length === 0) {
    return (
      <Card className="mt-6 animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No assessments available</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              There are no assessments assigned to you yet. Please check back later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Available Assessments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <Card 
            key={assessment.id}
            className="hover:shadow-md transition-shadow duration-200 animate-slide-in"
          >
            <CardHeader>
              <CardTitle as="h3" className="text-xl">
                {assessment.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {assessment.description}
              </p>
              <div className="flex flex-col space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Created {formatDate(assessment.createdAt)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Time: Unspecified</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between mt-2">
                <div>
                  <div className="text-xs text-gray-500">Total Marks</div>
                  <div className="font-semibold text-gray-900">{assessment.totalMarks}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Questions</div>
                  <div className="font-semibold text-gray-900">{assessment.questions.length}</div>
                </div>
                <Link to={`/student/assessments/${assessment.id}`}>
                  <Button size="sm">
                    Take <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAssessmentList;