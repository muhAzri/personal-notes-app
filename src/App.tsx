
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotesPage from './pages/NotesPage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotesPage />} />
          <Route path="archived" element={<ArchivedNotesPage />} />
          <Route path="notes/new" element={<AddNotePage />} />
          <Route path="notes/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
