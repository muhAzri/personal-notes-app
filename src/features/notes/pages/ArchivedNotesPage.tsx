import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setArchivedNotes, setLoading, setError, removeNote, updateNoteArchiveStatus } from '@infrastructure/store/notesSlice';
import { useTranslation } from '@core/application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import SearchBar from '@core/components/SearchBar';
import NoteCard from '@core/components/NoteCard';
import PageHeader from '@core/components/PageHeader';
import NoteStats from '@core/components/NoteStats';
import EmptyState from '@core/components/EmptyState';
import { LoadingState } from '@core/components/LoadingState';

export default function ArchivedNotesPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { archivedNotes, isLoading, error } = useAppSelector((state) => state.notes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadArchivedNotes = async (): Promise<void> => {
      dispatch(setLoading(true));
      try {
        const notesData = await container.getArchivedNotesUseCase.execute();
        dispatch(setArchivedNotes(notesData));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : t('errors.failedToLoadArchivedNotes');
        dispatch(setError(errorMessage));
      }
    };

    void loadArchivedNotes();
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('errors.failedToDeleteNote');
      dispatch(setError(errorMessage));
    }
  };

  const handleUnarchive = async (id: string): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await container.unarchiveNoteUseCase.execute(id);
      dispatch(updateNoteArchiveStatus({ id, archived: false }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('errors.failedToUnarchiveNote');
      dispatch(setError(errorMessage));
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
        description={t('notes.archivedCollection')}
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
            title={t('notes.noArchivedNotesFound')}
            description={`${t('notes.archiveSearchResultEmpty')} "${searchQuery}".`}
          />
        ) : (
          <EmptyState
            icon="📦"
            title={t('notes.emptyArchive')}
            description={t('notes.emptyArchiveDesc')}
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
              onDelete={(id) => void handleDelete(id)}
              onArchive={() => { }}
              onUnarchive={(id) => void handleUnarchive(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}