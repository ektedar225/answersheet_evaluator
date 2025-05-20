import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileCheck, UserCheck, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Simplify Assessment <span className="text-primary-600">Evaluation</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A modern platform for creating assessments, collecting student submissions, and automating the evaluation process.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="lg" className="px-8">
              Create Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Educators and Students
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Assessments</h3>
              <p className="text-gray-600">
                Easily create assessments with different question types and define marking schemes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-secondary-100 text-secondary-500 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Submissions</h3>
              <p className="text-gray-600">
                Students can access assessments and submit their answers through an intuitive interface.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-accent-100 text-accent-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Evaluation</h3>
              <p className="text-gray-600">
                Answers are automatically evaluated against the provided answer key, saving time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-success-500 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Results</h3>
              <p className="text-gray-600">
                Comprehensive results showing scores, correct answers, and personalized feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
              <p className="text-gray-600">
                Create assessments, define correct answers, set marks for each question, and share with students.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p className="text-gray-600">
                Access available assessments, submit answers, and receive immediate feedback and scores.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Automated Results</h3>
              <p className="text-gray-600">
                The system automatically evaluates answers, calculates scores, and generates detailed feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-primary-600 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Assessment Evaluation?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join educators and students who are already using EduEval to streamline the assessment process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-primary-700 px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;