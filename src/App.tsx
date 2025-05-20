import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// Layouts
import MainLayout from './components/Layout/MainLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAssessments from './pages/teacher/TeacherAssessments';
import CreateAssessment from './pages/teacher/CreateAssessment';
import AssessmentDetails from './pages/teacher/AssessmentDetails';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAssessments from './pages/student/StudentAssessments';
import AssessmentTake from './pages/student/AssessmentTake';
import Results from './pages/student/Results';

// Protected Route Component
const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  allowedRoles?: string[];
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Teacher Routes */}
          <Route 
            path="teacher/dashboard" 
            element={<ProtectedRoute element={<TeacherDashboard />} allowedRoles={['teacher']} />} 
          />
          <Route 
            path="teacher/assessments" 
            element={<ProtectedRoute element={<TeacherAssessments />} allowedRoles={['teacher']} />} 
          />
          <Route 
            path="teacher/assessments/create" 
            element={<ProtectedRoute element={<CreateAssessment />} allowedRoles={['teacher']} />} 
          />
          <Route 
            path="teacher/assessments/:id" 
            element={<ProtectedRoute element={<AssessmentDetails />} allowedRoles={['teacher']} />} 
          />
          
          {/* Student Routes */}
          <Route 
            path="student/dashboard" 
            element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />} 
          />
          <Route 
            path="student/assessments" 
            element={<ProtectedRoute element={<StudentAssessments />} allowedRoles={['student']} />} 
          />
          <Route 
            path="student/assessments/:id" 
            element={<ProtectedRoute element={<AssessmentTake />} allowedRoles={['student']} />} 
          />
          <Route 
            path="student/results" 
            element={<ProtectedRoute element={<Results />} allowedRoles={['student']} />} 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;