export interface INoteActionStrategy {
  execute(noteId: string): Promise<void>;
  getLabel(): string;
  getIcon(): string;
  isApplicable(noteIsArchived: boolean): boolean;
}

export class ArchiveNoteStrategy implements INoteActionStrategy {
  constructor(private archiveNote: (id: string) => Promise<void>) {}

  async execute(noteId: string): Promise<void> {
    await this.archiveNote(noteId);
  }

  getLabel(): string {
    return 'Archive';
  }

  getIcon(): string {
    return 'archive';
  }

  isApplicable(noteIsArchived: boolean): boolean {
    return !noteIsArchived;
  }
}

export class UnarchiveNoteStrategy implements INoteActionStrategy {
  constructor(private unarchiveNote: (id: string) => Promise<void>) {}

  async execute(noteId: string): Promise<void> {
    await this.unarchiveNote(noteId);
  }

  getLabel(): string {
    return 'Unarchive';
  }

  getIcon(): string {
    return 'archive-restore';
  }

  isApplicable(noteIsArchived: boolean): boolean {
    return noteIsArchived;
  }
}

export class DeleteNoteStrategy implements INoteActionStrategy {
  constructor(private deleteNote: (id: string) => Promise<void>) {}

  async execute(noteId: string): Promise<void> {
    await this.deleteNote(noteId);
  }

  getLabel(): string {
    return 'Delete';
  }

  getIcon(): string {
    return 'trash-2';
  }

  isApplicable(): boolean {
    return true; // Delete is always available
  }
}