import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Note } from '@domain/entities/Note';
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setArchivedNotes, setLoading, setError, removeNote, updateNoteArchiveStatus } from '@infrastructure/store/notesSlice';
import { useTranslation } from '@application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import SearchBar from '@/components/SearchBar';
import NoteCard from '@/components/NoteCard';
import PageHeader from '@/components/PageHeader';
import NoteStats from '@/components/NoteStats';
import EmptyState from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';

export default function ArchivedNotesPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { archivedNotes, isLoading, error } = useAppSelector((state) => state.notes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadArchivedNotes = async () => {
      dispatch(setLoading(true));
      try {
        const notesData = await container.getArchivedNotesUseCase.execute();
        dispatch(setArchivedNotes(notesData));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to load archived notes'));
      }
    };

    loadArchivedNotes();
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

  const handleUnarchive = async (id: string): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await container.unarchiveNoteUseCase.execute(id);
      dispatch(updateNoteArchiveStatus({ id, archived: false }));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to unarchive note'));
    }
  };

  const filteredNotes = archivedNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading && archivedNotes.length === 0) {
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
        title={`📦 ${t('nav.archived')}`}
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
            title={t('notes.emptyArchive')}
            description="No notes have been archived yet. Archive notes from your active collection to organize them better."
            actionLabel={`📋 ${t('nav.notes')}`}
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