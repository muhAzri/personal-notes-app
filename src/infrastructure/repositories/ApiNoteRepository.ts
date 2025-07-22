import { NoteRepository } from '@domain/repositories/NoteRepository';
import { Note, CreateNoteRequest } from '@domain/entities/Note';
import { apiClient } from '@infrastructure/api/apiClient';

export class ApiNoteRepository implements NoteRepository {
  async getAllNotes(): Promise<Note[]> {
    const response = await apiClient.get<Note[]>('/notes');
    return response.data || [];
  }

  async getArchivedNotes(): Promise<Note[]> {
    const response = await apiClient.get<Note[]>('/notes/archived');
    return response.data || [];
  }

  async getNoteById(id: string): Promise<Note> {
    const response = await apiClient.get<Note>(`/notes/${id}`);
    if (!response.data) {
      throw new Error('Note not found');
    }
    return response.data;
  }

  async createNote(note: CreateNoteRequest): Promise<Note> {
    const response = await apiClient.post<Note>('/notes', note);
    if (!response.data) {
      throw new Error('Failed to create note');
    }
    return response.data;
  }

  async deleteNote(id: string): Promise<void> {
    await apiClient.delete(`/notes/${id}`);
  }

  async archiveNote(id: string): Promise<void> {
    await apiClient.post(`/notes/${id}/archive`);
  }

  async unarchiveNote(id: string): Promise<void> {
    await apiClient.post(`/notes/${id}/unarchive`);
  }
}