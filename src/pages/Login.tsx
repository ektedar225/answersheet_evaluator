import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-8">
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
  );
};

export default Login;