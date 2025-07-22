import { Badge } from "@core/components/ui/badge"
import { useTranslation } from "@core/application/hooks/useTranslation"

interface NoteStatsProps {
  count: number
  type: "active" | "archived"
}

export default function NoteStats({ count, type }: NoteStatsProps): JSX.Element {
  const { t } = useTranslation();
  const variants = {
    active: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    archived: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700"
  }
  
  const getStatsTranslation = (count: number, type: "active" | "archived"): string => {
    if (type === "active") {
      return count === 1 ? t('notes.stats.activeNote') : t('notes.stats.activeNotes');
    } else {
      return count === 1 ? t('notes.stats.archivedNote') : t('notes.stats.archivedNotes');
    }
  }
  
  return (
    <Badge 
      variant="outline" 
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-sm transition-colors ${variants[type]}`}
    >
      {count} {getStatsTranslation(count, type)}
    </Badge>
  )
}