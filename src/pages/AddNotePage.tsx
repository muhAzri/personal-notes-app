import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';

export default function AddNotePage(): JSX.Element {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and body fields.');
      return;
    }

    addNote({ title: title.trim(), body: body.trim() });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-medium border border-gray-200 p-4 sm:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">✏️ Add New Note</h1>
          <p className="text-sm sm:text-base text-gray-600">Create a new note to capture your thoughts and ideas</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              📝 Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title for your note..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg sm:text-xl font-medium transition-all duration-200 placeholder-gray-400"
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="body" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              📄 Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note content here... Share your thoughts, ideas, or anything you want to remember!"
              rows={10}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-vertical text-base sm:text-lg leading-relaxed transition-all duration-200 placeholder-gray-400"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-secondary text-white rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-all duration-200 font-semibold shadow-soft hover:shadow-medium order-1 sm:order-2"
            >
              💾 Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}