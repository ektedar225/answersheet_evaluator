import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">EduEval</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && user?.role === 'teacher' && (
            <>
              <Link to="/teacher/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/teacher/assessments" className="text-gray-700 hover:text-primary-600 transition-colors">
                Assessments
              </Link>
              <Link to="/teacher/submissions" className="text-gray-700 hover:text-primary-600 transition-colors">
                Submissions
              </Link>
            </>
          )}

          {isAuthenticated && user?.role === 'student' && (
            <>
              <Link to="/student/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/student/assessments" className="text-gray-700 hover:text-primary-600 transition-colors">
                Assessments
              </Link>
              <Link to="/student/results" className="text-gray-700 hover:text-primary-600 transition-colors">
                Results
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                  {user?.role === 'teacher' ? 'Teacher' : 'Student'}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;