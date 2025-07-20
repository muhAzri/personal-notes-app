import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 sm:py-20 px-4">
      <div className="mb-6 sm:mb-8">
        <div className="text-primary text-6xl sm:text-9xl font-bold mb-3 sm:mb-4">404</div>
        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Page Not Found</h1>
      <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-sm sm:max-w-md mx-auto">
        Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-soft hover:shadow-medium"
        >
          📋 Go to Notes
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-primary text-primary rounded-lg sm:rounded-xl hover:bg-primary hover:text-white transition-all duration-200 font-semibold"
        >
          ← Go Back
        </button>
      </div>
      <div className="mt-8 sm:mt-12 text-gray-600">
        <p className="text-sm sm:text-base">Lost? Try these popular sections:</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-3 sm:mt-4">
          <a
            href="/"
            className="text-primary hover:text-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Active Notes
          </a>
          <a
            href="/archived"
            className="text-warning hover:text-amber-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Archived Notes
          </a>
          <a
            href="/notes/new"
            className="text-secondary hover:text-emerald-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Create Note
          </a>
        </div>
      </div>
    </div>
  );
}