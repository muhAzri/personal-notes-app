import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';

export default function NoteDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundNote = getNote(id);
      setNote(foundNote || null);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (note && window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
      navigate('/');
    }
  };

  const handleArchive = () => {
    if (note) {
      if (note.archived) {
        unarchiveNote(note.id);
      } else {
        archiveNote(note.id);
      }
      const updatedNote = getNote(note.id);
      setNote(updatedNote || null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-4xl">⏳</div>
        <div className="ml-4 text-xl text-gray-900 font-medium">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">❌</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Note not found</h3>
        <p className="text-gray-600 text-lg mb-8">The note you're looking for doesn't exist or may have been deleted.</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-soft hover:shadow-medium"
          >
            📋 Back to Notes
          </button>
          <button
            onClick={() => navigate('/archived')}
            className="px-6 py-3 bg-warning text-white rounded-xl hover:bg-amber-600 transition-all duration-200 font-semibold shadow-soft hover:shadow-medium"
          >
            📦 Check Archives
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-medium border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 break-words">{note.title}</h1>
              <div className="text-white text-opacity-90 text-sm sm:text-lg">
                <p className="mb-2 sm:mb-0">📅 Created on {formatDate(note.createdAt)}</p>
                {note.archived && (
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium bg-amber-100 text-amber-800 mt-2 sm:mt-0 sm:ml-3">
                    📦 Archived
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto sm:ml-6 flex-shrink-0">
              <button
                onClick={handleArchive}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shadow-soft hover:shadow-medium flex-1 sm:flex-none whitespace-nowrap ${
                  note.archived
                    ? 'bg-secondary text-white hover:bg-emerald-600'
                    : 'bg-warning text-white hover:bg-amber-600'
                }`}
              >
                <span className="sm:hidden">{note.archived ? '📤' : '📦'}</span>
                <span className="hidden sm:inline">{note.archived ? '📤 Unarchive' : '📦 Archive'}</span>
              </button>
              <button
                onClick={handleDelete}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-error text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-red-600 transition-all duration-200 shadow-soft hover:shadow-medium flex-1 sm:flex-none whitespace-nowrap"
              >
                <span className="sm:hidden">🗑️</span>
                <span className="hidden sm:inline">🗑️ Delete</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-8">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base sm:text-lg break-words">
              {note.body}
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-8 pt-0 border-t border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            ← Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
}