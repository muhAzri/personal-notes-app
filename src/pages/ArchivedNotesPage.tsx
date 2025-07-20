import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';

export default function ArchivedNotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setNotes(getArchivedNotes());
  }, []);

  const handleSearchChange = (query: string) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getArchivedNotes());
  };

  const handleUnarchive = (id: string) => {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-warning mb-1 sm:mb-2">📦 Archived Notes</h1>
          <p className="text-sm sm:text-base text-gray-600">Your archived notes collection</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 rounded-lg sm:rounded-xl text-warning font-semibold border border-amber-100 text-sm">
            {filteredNotes.length} archived {filteredNotes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">📦</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {searchQuery ? 'No archived notes found' : 'Arsip kosong'}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg max-w-sm sm:max-w-md mx-auto px-4">
            {searchQuery 
              ? `No archived notes found containing "${searchQuery}". Try searching with different keywords.`
              : 'No notes have been archived yet. Archive notes from your active collection to organize them better.'
            }
          </p>
          {!searchQuery && (
            <div className="mt-6 sm:mt-8">
              <a
                href="/"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-soft hover:shadow-medium text-sm sm:text-base"
              >
                📋 View Active Notes
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onArchive={() => {}}
              onUnarchive={handleUnarchive}
            />
          ))}
        </div>
      )}
    </div>
  );
}