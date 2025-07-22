import { Note, CreateNoteRequest } from '@core/domain/entities/Note';
import { NoteRepository } from '@core/domain/repositories/NoteRepository';

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(request: CreateNoteRequest): Promise<Note> {
    if (!request.title.trim()) {
      throw new Error('Title is required');
    }
    if (!request.body.trim()) {
      throw new Error('Body is required');
    }
    
    return this.noteRepository.createNote(request);
  }
}