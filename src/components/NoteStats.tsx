import { Badge } from "@/components/ui/badge"

interface NoteStatsProps {
  count: number
  type: "active" | "archived"
}

export default function NoteStats({ count, type }: NoteStatsProps) {
  const variants = {
    active: "bg-blue-50 text-primary border-blue-100",
    archived: "bg-amber-50 text-warning border-amber-100"
  }
  
  return (
    <Badge 
      variant="outline" 
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-sm ${variants[type]}`}
    >
      {count} {type} {count === 1 ? 'note' : 'notes'}
    </Badge>
  )
}