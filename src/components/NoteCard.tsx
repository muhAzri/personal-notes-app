import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../utils/local-data';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onArchive, onUnarchive }: NoteCardProps): JSX.Element {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-soft hover:shadow-medium hover:border-gray-300 transition-all duration-300 p-4 sm:p-6 transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3">
        <Link to={`/notes/${note.id}`} className="flex-1 group min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 break-words">
            {note.title}
          </h3>
        </Link>
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
          {note.archived ? (
            <button
              onClick={() => onUnarchive(note.id)}
              className="px-2 sm:px-3 py-1 text-xs font-medium text-white bg-secondary rounded-md sm:rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none"
            >
              <span className="sm:hidden">📤</span>
              <span className="hidden sm:inline">📤 Unarchive</span>
            </button>
          ) : (
            <button
              onClick={() => onArchive(note.id)}
              className="px-2 sm:px-3 py-1 text-xs font-medium text-white bg-warning rounded-md sm:rounded-lg hover:bg-amber-600 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none"
            >
              <span className="sm:hidden">📦</span>
              <span className="hidden sm:inline">📦 Archive</span>
            </button>
          )}
          <button
            onClick={() => onDelete(note.id)}
            className="px-2 sm:px-3 py-1 text-xs font-medium text-white bg-error rounded-md sm:rounded-lg hover:bg-red-600 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none"
          >
            <span className="sm:hidden">🗑️</span>
            <span className="hidden sm:inline">🗑️ Delete</span>
          </button>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 font-medium">📅 {formatDate(note.createdAt)}</p>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3 sm:line-clamp-4">{note.body}</p>
      {note.archived && (
        <div className="mt-3 sm:mt-4 inline-flex items-center px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          📦 Archived
        </div>
      )}
    </div>
  );
}