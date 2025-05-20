import React from 'react';
import { Book } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">EKT_Evaluator</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              A modern assessment platform for educational institutions. Simplifying the evaluation process for teachers and students.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} EKT_Evaluator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;