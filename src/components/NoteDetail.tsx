import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import DateDisplay from "@/components/DateDisplay"
import { Note } from '../utils/local-data';

interface NoteDetailProps {
  note: Note
  onArchive: () => void
  onDelete: () => void
  onBack: () => void
}

export default function NoteDetail({ note, onArchive, onDelete, onBack }: NoteDetailProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="shadow-medium border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <TypographyH1 className="text-white mb-2 sm:mb-3 break-words">{note.title}</TypographyH1>
              <div className="text-white text-opacity-90 text-sm sm:text-lg">
                <DateDisplay date={note.createdAt} className="text-white text-opacity-90 mb-2 sm:mb-0" />
                {note.archived && (
                  <Badge className="bg-amber-100 text-amber-800 mt-2 sm:mt-0 sm:ml-3">
                    📦 Archived
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto sm:ml-6 flex-shrink-0">
              <Button
                onClick={onArchive}
                variant="outline"
                className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-soft hover:shadow-medium flex-1 sm:flex-none whitespace-nowrap ${
                  note.archived
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600'
                    : 'bg-warning text-white hover:bg-amber-600 border-warning'
                }`}
              >
                <span className="sm:hidden">{note.archived ? '📤' : '📦'}</span>
                <span className="hidden sm:inline">{note.archived ? '📤 Unarchive' : '📦 Archive'}</span>
              </Button>
              <Button
                onClick={onDelete}
                variant="outline"
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-error text-white text-xs sm:text-sm font-medium hover:bg-red-600 transition-all duration-200 shadow-soft hover:shadow-medium flex-1 sm:flex-none whitespace-nowrap border-error"
              >
                <span className="sm:hidden">🗑️</span>
                <span className="hidden sm:inline">🗑️ Delete</span>
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-8">
          <div className="prose max-w-none">
            <TypographyP className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base sm:text-lg break-words">
              {note.body}
            </TypographyP>
          </div>
        </CardContent>
        
        <div className="p-4 sm:p-8 pt-0 border-t border-gray-200">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 hover:text-primary font-medium text-sm sm:text-base"
          >
            ← View Notes
          </Button>
        </div>
      </Card>
    </div>
  )
}