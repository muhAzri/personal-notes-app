import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { Note } from '../utils/local-data';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import NoteDetail from '../components/NoteDetail';

export default function NoteDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundNote = getNote(id);
      setNote(foundNote || null);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = (): void => {
    if (note && window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
      void navigate('/');
    }
  };

  const handleArchive = (): void => {
    if (note) {
      if (note.archived) {
        unarchiveNote(note.id);
      } else {
        archiveNote(note.id);
      }
      const updatedNote = getNote(note.id);
      setNote(updatedNote || null);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!note) {
    return (
      <div className="text-center py-16">
        <EmptyState
          icon="❌"
          title="Note not found"
          description="The note you're looking for doesn't exist or may have been deleted."
        />
        <div className="space-x-4 mt-8">
          <Button
            onClick={() => void navigate('/')}
            className="bg-primary hover:bg-blue-700 shadow-soft hover:shadow-medium"
          >
            📋 View Notes
          </Button>
          <Button
            onClick={() => void navigate('/archived')}
            className="bg-warning hover:bg-amber-600 shadow-soft hover:shadow-medium"
          >
            📦 View Archived Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <NoteDetail
      note={note}
      onArchive={handleArchive}
      onDelete={handleDelete}
      onBack={() => void navigate('/')}
    />
  );
}