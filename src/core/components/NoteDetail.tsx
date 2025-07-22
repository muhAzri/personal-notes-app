import { Card, CardContent } from "@core/components/ui/card"
import { Badge } from "@core/components/ui/badge"
import { Button } from "@core/components/ui/button"
import { TypographyH1, TypographyP } from "@core/components/ui/typography"
import DateDisplay from "@core/components/DateDisplay"
import { useTranslation } from "@core/application/hooks/useTranslation"
import { Note } from '@core/domain/entities/Note';

interface NoteDetailProps {
  note: Note
  onArchive: () => void
  onDelete: () => void
  onBack: () => void
}

export default function NoteDetail({ note, onArchive, onDelete, onBack }: NoteDetailProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <TypographyH1 className="text-white mb-2 sm:mb-3 break-words">{note.title}</TypographyH1>
              <div className="text-white text-opacity-90 text-sm sm:text-lg">
                <DateDisplay date={note.createdAt} className="text-white text-opacity-90 mb-2 sm:mb-0" />
                {note.archived && (
                  <Badge className="bg-amber-100 text-amber-800 mt-2 sm:mt-0 sm:ml-3">
                    📦 {t('notes.archived')}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto sm:ml-6 flex-shrink-0">
              <Button
                onClick={onArchive}
                variant="outline"
                className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm flex-1 sm:flex-none whitespace-nowrap ${
                  note.archived
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600'
                    : 'bg-orange-600 dark:bg-orange-600 text-white hover:bg-orange-700 dark:hover:bg-orange-700 border-orange-600 dark:border-orange-600'
                }`}
              >
                <span className="sm:hidden">{note.archived ? '📤' : '📦'}</span>
                <span className="hidden sm:inline">{note.archived ? `📤 ${t('notes.unarchive')}` : `📦 ${t('notes.archive')}`}</span>
              </Button>
              <Button
                onClick={onDelete}
                variant="outline"
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-600 dark:bg-red-600 text-white text-xs sm:text-sm font-medium hover:bg-red-700 dark:hover:bg-red-700 transition-all duration-200 shadow-sm flex-1 sm:flex-none whitespace-nowrap border-red-600 dark:border-red-600"
              >
                <span className="sm:hidden">🗑️</span>
                <span className="hidden sm:inline">🗑️ {t('notes.delete')}</span>
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-8">
          <div className="prose max-w-none">
            <TypographyP className="whitespace-pre-wrap text-gray-800 dark:text-slate-200 leading-relaxed text-base sm:text-lg break-words">
              {note.body}
            </TypographyP>
          </div>
        </CardContent>
        
        <div className="p-4 sm:p-8 pt-0 border-t border-gray-200 dark:border-slate-700">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm sm:text-base"
          >
            {t('common.backToNotes')}
          </Button>
        </div>
      </Card>
    </div>
  )
}