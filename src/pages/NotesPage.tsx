import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import PageHeader from '../components/PageHeader';
import NoteStats from '../components/NoteStats';
import EmptyState from '../components/EmptyState';

export default function NotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setNotes(getActiveNotes());
  }, []);

  const handleSearchChange = (query: string): void => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleDelete = (id: string): void => {
    deleteNote(id);
    setNotes(getActiveNotes());
  };

  const handleArchive = (id: string): void => {
    archiveNote(id);
    setNotes(getActiveNotes());
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="📋 Notes"
        description="Manage your notes collection"
        actions={<NoteStats count={filteredNotes.length} type="active" />}
      />
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />

      {filteredNotes.length === 0 ? (
        searchQuery ? (
          <EmptyState
            icon="📝"
            title="No notes found"
            description={`No notes found containing "${searchQuery}". Try searching with different keywords.`}
          />
        ) : (
          <EmptyState
            icon="📝"
            title="No notes available"
            description="Start by creating your first note to organize your thoughts and ideas!"
            actionLabel="✏️ Add Your First Note"
            actionHref="/notes/new"
          />
        )
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