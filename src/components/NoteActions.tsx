import { Button } from "@/components/ui/button"

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
}: NoteActionsProps) {
  const buttonSize = size === "sm" ? "px-2 sm:px-3 py-1" : "px-4 sm:px-6 py-1.5 sm:py-2"
  const textSize = size === "sm" ? "text-xs" : "text-xs sm:text-sm"
  
  return (
    <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
      {isArchived ? (
        <Button
          onClick={onUnarchive}
          variant="outline"
          size="sm"
          className={`${buttonSize} ${textSize} font-medium text-white bg-emerald-600 rounded-md sm:rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none border-emerald-600 hover:border-emerald-700`}
        >
          <span className="sm:hidden">📤</span>
          <span className="hidden sm:inline">📤 Unarchive</span>
        </Button>
      ) : (
        <Button
          onClick={onArchive}
          variant="outline"
          size="sm"
          className={`${buttonSize} ${textSize} font-medium text-white bg-warning rounded-md sm:rounded-lg hover:bg-amber-600 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none border-warning hover:border-amber-600`}
        >
          <span className="sm:hidden">📦</span>
          <span className="hidden sm:inline">📦 Archive</span>
        </Button>
      )}
      <Button
        onClick={onDelete}
        variant="outline"
        size="sm"
        className={`${buttonSize} ${textSize} font-medium text-white bg-error rounded-md sm:rounded-lg hover:bg-red-600 transition-all duration-200 shadow-soft whitespace-nowrap flex-1 sm:flex-none border-error hover:border-red-600`}
      >
        <span className="sm:hidden">🗑️</span>
        <span className="hidden sm:inline">🗑️ Delete</span>
      </Button>
    </div>
  )
}