import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Your Account</h1>
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;