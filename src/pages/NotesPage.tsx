import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Note } from '@domain/entities/Note';
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setNotes, setLoading, setError, removeNote, updateNoteArchiveStatus } from '@infrastructure/store/notesSlice';
import { useTranslation } from '@application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import SearchBar from '@/components/SearchBar';
import NoteCard from '@/components/NoteCard';
import PageHeader from '@/components/PageHeader';
import NoteStats from '@/components/NoteStats';
import EmptyState from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';

export default function NotesPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { notes, isLoading, error } = useAppSelector((state) => state.notes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadNotes = async () => {
      dispatch(setLoading(true));
      try {
        const notesData = await container.getNotesUseCase.execute();
        dispatch(setNotes(notesData));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to load notes'));
      }
    };

    loadNotes();
  }, [dispatch]);

  const handleSearchChange = (query: string): void => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await container.deleteNoteUseCase.execute(id);
      dispatch(removeNote(id));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to delete note'));
    }
  };

  const handleArchive = async (id: string): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await container.archiveNoteUseCase.execute(id);
      dispatch(updateNoteArchiveStatus({ id, archived: true }));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to archive note'));
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading && notes.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <EmptyState
        icon="❌"
        title={t('common.error')}
        description={error}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={`📋 ${t('nav.notes')}`}
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
            title={t('notes.empty')}
            description="Start by creating your first note to organize your thoughts and ideas!"
            actionLabel={`✏️ ${t('notes.add')}`}
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