import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@infrastructure/store/authSlice';
import notesReducer from '@infrastructure/store/notesSlice';
import themeReducer from '@infrastructure/store/themeSlice';
import languageReducer from '@infrastructure/store/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;