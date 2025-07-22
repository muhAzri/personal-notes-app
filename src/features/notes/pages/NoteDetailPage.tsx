import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@core/components/ui/button";
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setCurrentNote, setLoading, setError, removeNote, updateNoteArchiveStatus } from '@infrastructure/store/notesSlice';
import { useTranslation } from '@core/application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import { LoadingState } from '@core/components/LoadingState';
import EmptyState from '@core/components/EmptyState';
import NoteDetail from '@core/components/NoteDetail';

export default function NoteDetailPage(): JSX.Element {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentNote, isLoading, error } = useAppSelector((state) => state.notes);

  useEffect(() => {
    const loadNote = async (): Promise<void> => {
      if (id) {
        dispatch(setLoading(true));
        try {
          const note = await container.getNoteByIdUseCase.execute(id);
          dispatch(setCurrentNote(note));
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load note';
          dispatch(setError(errorMessage));
          dispatch(setCurrentNote(null));
        }
      }
    };

    void loadNote();
  }, [id, dispatch]);

  const handleDelete = async (): Promise<void> => {
    if (currentNote && window.confirm('Are you sure you want to delete this note?')) {
      dispatch(setLoading(true));
      try {
        await container.deleteNoteUseCase.execute(currentNote.id);
        dispatch(removeNote(currentNote.id));
        void navigate('/');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
        dispatch(setError(errorMessage));
      }
    }
  };

  const handleArchive = async (): Promise<void> => {
    if (currentNote) {
      dispatch(setLoading(true));
      try {
        if (currentNote.archived) {
          await container.unarchiveNoteUseCase.execute(currentNote.id);
          dispatch(updateNoteArchiveStatus({ id: currentNote.id, archived: false }));
        } else {
          await container.archiveNoteUseCase.execute(currentNote.id);
          dispatch(updateNoteArchiveStatus({ id: currentNote.id, archived: true }));
        }
        
        const updatedNote = await container.getNoteByIdUseCase.execute(currentNote.id);
        dispatch(setCurrentNote(updatedNote));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update note';
        dispatch(setError(errorMessage));
      }
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !currentNote) {
    return (
      <div className="text-center py-16">
        <EmptyState
          icon="❌"
          title={t('common.error')}
          description={error || "The note you're looking for doesn't exist or may have been deleted."}
        />
        <div className="space-x-4 mt-8">
          <Button
            onClick={() => void navigate('/')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            📋 {t('nav.notes')}
          </Button>
          <Button
            onClick={() => void navigate('/archived')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            📦 {t('nav.archived')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <NoteDetail
      note={currentNote}
      onArchive={() => void handleArchive()}
      onDelete={() => void handleDelete()}
      onBack={() => void navigate('/')}
    />
  );
}