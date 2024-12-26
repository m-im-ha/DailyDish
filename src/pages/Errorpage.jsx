import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const Errorpage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center max-w-lg w-full space-y-6">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-yellow-500 text-6xl md:text-8xl animate-bounce" />
        </div>
        
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg mb-6">
          Oops! The page you're looking for seems to have taken an unexpected detour. 
          Don't worry, our movie navigation system is just being a bit dramatic.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/" 
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;