import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setNotes, setLoading, setError, removeNote, updateNoteArchiveStatus } from '@infrastructure/store/notesSlice';
import { useTranslation } from '@core/application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import SearchBar from '@core/components/SearchBar';
import NoteCard from '@core/components/NoteCard';
import PageHeader from '@core/components/PageHeader';
import NoteStats from '@core/components/NoteStats';
import EmptyState from '@core/components/EmptyState';
import { LoadingState } from '@core/components/LoadingState';

export default function NotesPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { notes, isLoading, error } = useAppSelector((state) => state.notes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadNotes = async (): Promise<void> => {
      dispatch(setLoading(true));
      try {
        const notesData = await container.getNotesUseCase.execute();
        dispatch(setNotes(notesData));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : t('errors.failedToLoadNotes');
        dispatch(setError(errorMessage));
      }
    };

    void loadNotes();
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

  const handleArchive = async (id: string): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await container.archiveNoteUseCase.execute(id);
      dispatch(updateNoteArchiveStatus({ id, archived: true }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('errors.failedToArchiveNote');
      dispatch(setError(errorMessage));
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
        description={t('notes.manageCollection')}
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
            title={t('notes.noNotesFound')}
            description={`${t('notes.searchResultEmpty')} "${searchQuery}".`}
          />
        ) : (
          <EmptyState
            icon="📝"
            title={t('notes.empty')}
            description={t('notes.emptyStateDesc')}
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
              onDelete={(id) => void handleDelete(id)}
              onArchive={(id) => void handleArchive(id)}
              onUnarchive={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}