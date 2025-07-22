
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@infrastructure/store/store';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setTheme } from '@infrastructure/store/themeSlice';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import NotesPage from './pages/NotesPage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import LoginPage from './features/auth/components/LoginPage';
import RegisterPage from './features/auth/components/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

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
