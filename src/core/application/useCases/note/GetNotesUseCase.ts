import { Note } from '@core/domain/entities/Note';
import { NoteRepository } from '@core/domain/repositories/NoteRepository';

export class GetNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.getAllNotes();
  }
}

export class GetArchivedNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.getArchivedNotes();
  }
}

export class GetNoteByIdUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string): Promise<Note> {
    return this.noteRepository.getNoteById(id);
  }
}