import { Note } from '@core/domain/entities/Note';

export interface NoteReadRepository {
  getAllNotes(): Promise<Note[]>;
  getArchivedNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note>;
}