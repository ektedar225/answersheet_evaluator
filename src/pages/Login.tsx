import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src="/bg_1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      {/* Content */}
      <div className="relative z-20 max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;