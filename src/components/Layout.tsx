import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <div className="min-h-screen bg-light-background text-light-on-background font-inter">
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">📝 Notes App</h1>
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-end">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-soft'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span className="sm:hidden">📋</span>
                <span className="hidden sm:inline">📋 Active Notes</span>
              </NavLink>
              <NavLink
                to="/archived"
                className={({ isActive }) =>
                  `px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-warning text-white shadow-soft'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <span className="sm:hidden">📦</span>
                <span className="hidden sm:inline">📦 Archived</span>
              </NavLink>
              <NavLink
                to="/notes/new"
                className={({ isActive }) =>
                  `px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-secondary text-white shadow-soft'
                      : 'bg-secondary text-white hover:bg-emerald-600 shadow-soft'
                  }`
                }
              >
                <span className="sm:hidden">✏️</span>
                <span className="hidden sm:inline">✏️ Add Note</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}