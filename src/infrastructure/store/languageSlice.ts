import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'id' | 'en';

interface LanguageState {
  language: Language;
}

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage) {
    return savedLanguage;
  }
  return navigator.language.startsWith('id') ? 'id' : 'en';
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    toggleLanguage: (state) => {
      const newLanguage = state.language === 'id' ? 'en' : 'id';
      state.language = newLanguage;
      localStorage.setItem('language', newLanguage);
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;