import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import DateDisplay from "@/components/DateDisplay"
import NoteActions from "@/components/NoteActions"
import { Note } from '../utils/local-data';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onArchive, onUnarchive }: NoteCardProps): JSX.Element {
  return (
    <Card className="hover:shadow-medium hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3">
          <Link to={`/notes/${note.id}`} className="flex-1 group min-w-0">
            <TypographyH3 className="group-hover:text-primary transition-colors duration-200 line-clamp-2 break-words">
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
        <TypographyP className="leading-relaxed line-clamp-3 sm:line-clamp-4 text-gray-700">
          {note.body}
        </TypographyP>
        {note.archived && (
          <div className="mt-3 sm:mt-4">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              📦 Archived
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}