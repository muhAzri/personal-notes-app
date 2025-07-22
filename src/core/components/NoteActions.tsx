import { Button } from "@core/components/ui/button"
import { useTranslation } from "@core/application/hooks/useTranslation"

interface NoteActionsProps {
  isArchived: boolean
  onArchive?: () => void
  onUnarchive?: () => void
  onDelete: () => void
  size?: "sm" | "md"
}

export default function NoteActions({ 
  isArchived, 
  onArchive, 
  onUnarchive, 
  onDelete,
  size = "sm"
}: NoteActionsProps): JSX.Element {
  const { t } = useTranslation();
  const buttonSize = size === "sm" ? "px-2 sm:px-3 py-1" : "px-4 sm:px-6 py-1.5 sm:py-2"
  const textSize = size === "sm" ? "text-xs" : "text-xs sm:text-sm"
  
  return (
    <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
      {isArchived ? (
        <Button
          onClick={onUnarchive}
          variant="outline"
          size="sm"
          className={`${buttonSize} ${textSize} font-medium text-white bg-emerald-600 dark:bg-emerald-600 rounded-md sm:rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-all duration-200 shadow-sm whitespace-nowrap flex-1 sm:flex-none border-emerald-600 dark:border-emerald-600 hover:border-emerald-700 dark:hover:border-emerald-700`}
        >
          <span className="sm:hidden">📤</span>
          <span className="hidden sm:inline">📤 {t('notes.unarchive')}</span>
        </Button>
      ) : (
        <Button
          onClick={onArchive}
          variant="outline"
          size="sm"
          className={`${buttonSize} ${textSize} font-medium text-white bg-orange-600 dark:bg-orange-600 rounded-md sm:rounded-lg hover:bg-orange-700 dark:hover:bg-orange-700 transition-all duration-200 shadow-sm whitespace-nowrap flex-1 sm:flex-none border-orange-600 dark:border-orange-600 hover:border-orange-700 dark:hover:border-orange-700`}
        >
          <span className="sm:hidden">📦</span>
          <span className="hidden sm:inline">📦 {t('notes.archive')}</span>
        </Button>
      )}
      <Button
        onClick={onDelete}
        variant="outline"
        size="sm"
        className={`${buttonSize} ${textSize} font-medium text-white bg-red-600 dark:bg-red-600 rounded-md sm:rounded-lg hover:bg-red-700 dark:hover:bg-red-700 transition-all duration-200 shadow-sm whitespace-nowrap flex-1 sm:flex-none border-red-600 dark:border-red-600 hover:border-red-700 dark:hover:border-red-700`}
      >
        <span className="sm:hidden">🗑️</span>
        <span className="hidden sm:inline">🗑️ {t('notes.delete')}</span>
      </Button>
    </div>
  )
}