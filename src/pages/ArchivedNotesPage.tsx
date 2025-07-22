import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import PageHeader from '../components/PageHeader';
import NoteStats from '../components/NoteStats';
import EmptyState from '../components/EmptyState';

export default function ArchivedNotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setNotes(getArchivedNotes());
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
    setNotes(getArchivedNotes());
  };

  const handleUnarchive = (id: string): void => {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="📦 Archived Notes"
        description="Your archived notes collection"
        actions={<NoteStats count={filteredNotes.length} type="archived" />}
      />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {filteredNotes.length === 0 ? (
        searchQuery ? (
          <EmptyState
            icon="📦"
            title="No archived notes found"
            description={`No archived notes found containing "${searchQuery}". Try searching with different keywords.`}
          />
        ) : (
          <EmptyState
            icon="📦"
            title="Archive Empty"
            description="No notes have been archived yet. Archive notes from your active collection to organize them better."
            actionLabel="📋 View Notes"
            actionHref="/"
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onArchive={() => { }}
              onUnarchive={handleUnarchive}
            />
          ))}
        </div>
      )}
    </div>
  );
}