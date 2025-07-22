import { Note, CreateNoteRequest } from '@domain/entities/Note';

export interface NoteRepository {
  getAllNotes(): Promise<Note[]>;
  getArchivedNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note>;
  createNote(note: CreateNoteRequest): Promise<Note>;
  deleteNote(id: string): Promise<void>;
  archiveNote(id: string): Promise<void>;
  unarchiveNote(id: string): Promise<void>;
}