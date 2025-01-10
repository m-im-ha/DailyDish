import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationCircle } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';

const Errorpage = () => {
  const navigate = useNavigate();

  function handleGoBack(){
    navigate(-1);
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
        <div className="space-y-6 text-center">
          {/* Error Icon */}
          <div className="flex justify-center">
            <FaExclamationCircle className="text-6xl sm:text-7xl md:text-8xl text-amber-500 animate-pulse" />
          </div>
          
          {/* Error Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair text-amber-800 mb-2">
              404 - Page Not Found
            </h1>
            <div className="w-24 h-1 bg-amber-300 mx-auto"></div>
          </div>
          
          {/* Error Message */}
          <p className="font-lato text-base sm:text-lg text-amber-700 max-w-md mx-auto">
            Oops! Looks like this dish isn't on our menu. 
            Let's get you back to our main dining area.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-800 shadow-md hover:shadow-lg"
            >
              <FaHome className="mr-2 text-lg" />
              Return Home
              <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            
            <button 
              onClick={handleGoBack}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:from-amber-200 hover:to-amber-300 shadow-md hover:shadow-lg"
            >
              <BiArrowBack className="mr-2 text-lg" />
              Go Back
              <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>

          {/* Optional Decorative Elements */}
          <div className="absolute -z-10 w-72 h-72 blur-3xl rounded-full bg-amber-200/30 -top-10 -left-10"></div>
          <div className="absolute -z-10 w-72 h-72 blur-3xl rounded-full bg-amber-200/30 -bottom-10 -right-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;