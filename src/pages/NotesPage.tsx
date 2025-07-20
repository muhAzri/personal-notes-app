import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';

export default function NotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setNotes(getActiveNotes());
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
    setNotes(getActiveNotes());
  };

  const handleArchive = (id: string) => {
    archiveNote(id);
    setNotes(getActiveNotes());
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">📋 Active Notes</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your active notes collection</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-lg sm:rounded-xl text-primary font-semibold border border-blue-100 text-sm">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">📝</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {searchQuery ? 'No notes found' : 'Tidak ada catatan'}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg max-w-sm sm:max-w-md mx-auto px-4">
            {searchQuery 
              ? `No notes found containing "${searchQuery}". Try searching with different keywords.`
              : 'Start by creating your first note to organize your thoughts and ideas!'
            }
          </p>
          {!searchQuery && (
            <div className="mt-6 sm:mt-8">
              <a
                href="/notes/new"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary text-white font-semibold rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-soft hover:shadow-medium text-sm sm:text-base"
              >
                ✏️ Create Your First Note
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
              onArchive={handleArchive}
              onUnarchive={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}