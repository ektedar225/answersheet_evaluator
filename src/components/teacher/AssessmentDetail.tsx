import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Check, Clock, FileText, X } from 'lucide-react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { formatDate } from '../../lib/utils';

const AssessmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAssessmentById, currentAssessment, getSubmissions, submissions, isLoading } = useAssessmentStore();
  const [activeTab, setActiveTab] = useState<'details' | 'submissions'>('details');
  
  useEffect(() => {
    if (id) {
      getAssessmentById(id);
      getSubmissions(undefined, id);
    }
  }, [id, getAssessmentById, getSubmissions]);
  
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
        <Link to="/teacher/assessments">
          <Button variant="outline">
            Back to Assessments
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{currentAssessment.title}</h2>
          <div className="flex items-center text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">Created on {formatDate(currentAssessment.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="outline">Edit Assessment</Button>
          <Button>Share with Students</Button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Assessment Details
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'submissions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Student Submissions
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
              {submissions.length}
            </span>
          </button>
        </nav>
      </div>
      
      {activeTab === 'details' ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle as="h3">Overview</CardTitle>
              <CardDescription>
                {currentAssessment.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Total Marks</div>
                  <div className="text-2xl font-bold text-primary-600">{currentAssessment.totalMarks}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Questions</div>
                  <div className="text-2xl font-bold text-primary-600">{currentAssessment.questions.length}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-500 mb-1">Submissions</div>
                  <div className="text-2xl font-bold text-primary-600">{submissions.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle as="h3">Questions & Answer Key</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentAssessment.questions.map((question, index) => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      <div className="text-sm font-medium text-primary-600">{question.marks} marks</div>
                    </div>
                    <p className="my-2 text-gray-800">{question.text}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-sm font-medium text-gray-500 mb-1">Correct Answer:</div>
                      <div className="p-2 bg-green-50 border-l-4 border-green-500 text-green-800 rounded">
                        {question.correctAnswer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Students haven't submitted any answers for this assessment yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle as="h3">Submissions Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted At
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {submissions.map((submission) => {
                          const percentage = Math.round((submission.score / currentAssessment.totalMarks) * 100);
                          return (
                            <tr key={submission.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">Student {submission.studentId}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{formatDate(submission.submittedAt)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                {submission.score} / {currentAssessment.totalMarks}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div 
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    percentage >= 70 
                                      ? 'bg-green-100 text-green-800' 
                                      : percentage >= 40 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {percentage}%
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {submission.evaluated ? (
                                  <div className="flex items-center text-green-600">
                                    <Check className="h-4 w-4 mr-1" />
                                    <span>Evaluated</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-yellow-600">
                                    <X className="h-4 w-4 mr-1" />
                                    <span>Pending</span>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/teacher/submissions/${submission.id}`}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentDetail;