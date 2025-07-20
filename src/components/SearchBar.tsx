import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps): JSX.Element {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <span className="text-gray-400 text-base sm:text-lg">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-base sm:text-lg placeholder-gray-400 shadow-soft"
        />
      </div>
    </div>
  );
}