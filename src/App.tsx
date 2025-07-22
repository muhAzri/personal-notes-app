
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@infrastructure/store/store';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setTheme } from '@infrastructure/store/themeSlice';
import Layout from '@core/components/Layout';
import ProtectedRoute from '@core/components/ProtectedRoute';
import NotesPage from '@features/notes/pages/NotesPage';
import ArchivedNotesPage from '@features/notes/pages/ArchivedNotesPage';
import NoteDetailPage from '@features/notes/pages/NoteDetailPage';
import AddNotePage from '@features/notes/pages/AddNotePage';
import LoginPage from '@features/auth/pages/LoginPage';
import RegisterPage from '@features/auth/pages/RegisterPage';
import NotFoundPage from '@features/notes/pages/NotFoundPage';

function AppContent(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<NotesPage />} />
          <Route path="archived" element={<ArchivedNotesPage />} />
          <Route path="notes/new" element={<AddNotePage />} />
          <Route path="notes/:id" element={<NoteDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
