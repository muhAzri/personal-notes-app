import { NoteRepository } from '@core/domain/repositories/NoteRepository';

export class ArchiveNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Note ID is required');
    }
    
    return this.noteRepository.archiveNote(id);
  }
}

export class UnarchiveNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Note ID is required');
    }
    
    return this.noteRepository.unarchiveNote(id);
  }
}