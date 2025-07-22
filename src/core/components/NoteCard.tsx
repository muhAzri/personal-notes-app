import { Link } from 'react-router-dom';
import { Card, CardContent } from "@core/components/ui/card"
import { Badge } from "@core/components/ui/badge"
import { TypographyH3, TypographyP } from "@core/components/ui/typography"
import DateDisplay from "@core/components/DateDisplay"
import NoteActions from "@core/components/NoteActions"
import { useTranslation } from "@core/application/hooks/useTranslation"
import { Note } from '@core/domain/entities/Note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onArchive, onUnarchive }: NoteCardProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <Card className="hover:shadow-lg hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3">
          <Link to={`/notes/${note.id}`} className="flex-1 group min-w-0">
            <TypographyH3 className="text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 break-words">
              {note.title}
            </TypographyH3>
          </Link>
          <NoteActions
            isArchived={note.archived}
            onArchive={() => onArchive(note.id)}
            onUnarchive={() => onUnarchive(note.id)}
            onDelete={() => onDelete(note.id)}
          />
        </div>
        <DateDisplay date={note.createdAt} className="mb-3 sm:mb-4" />
        <TypographyP className="leading-relaxed line-clamp-3 sm:line-clamp-4 text-gray-700 dark:text-slate-300">
          {note.body}
        </TypographyP>
        {note.archived && (
          <div className="mt-3 sm:mt-4">
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700">
              📦 {t('notes.archived')}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}