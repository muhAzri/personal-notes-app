import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@domain/entities/Note';

interface NotesState {
  notes: Note[];
  archivedNotes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  archivedNotes: [],
  currentNote: null,
  isLoading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setArchivedNotes: (state, action: PayloadAction<Note[]>) => {
      state.archivedNotes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.archivedNotes = state.archivedNotes.filter(note => note.id !== action.payload);
      state.isLoading = false;
      state.error = null;
    },
    updateNoteArchiveStatus: (state, action: PayloadAction<{id: string, archived: boolean}>) => {
      const { id, archived } = action.payload;
      const noteIndex = state.notes.findIndex(note => note.id === id);
      const archivedNoteIndex = state.archivedNotes.findIndex(note => note.id === id);
      
      if (archived) {
        if (noteIndex !== -1) {
          const note = { ...state.notes[noteIndex], archived: true };
          state.notes.splice(noteIndex, 1);
          state.archivedNotes.unshift(note);
        }
      } else {
        if (archivedNoteIndex !== -1) {
          const note = { ...state.archivedNotes[archivedNoteIndex], archived: false };
          state.archivedNotes.splice(archivedNoteIndex, 1);
          state.notes.unshift(note);
        }
      }
      
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setNotes,
  setArchivedNotes,
  setCurrentNote,
  addNote,
  removeNote,
  updateNoteArchiveStatus,
} = notesSlice.actions;

export default notesSlice.reducer;