import { Note, CreateNoteRequest } from '@core/domain/entities/Note';

export interface NoteWriteRepository {
  createNote(note: CreateNoteRequest): Promise<Note>;
  deleteNote(id: string): Promise<void>;
  archiveNote(id: string): Promise<void>;
  unarchiveNote(id: string): Promise<void>;
}