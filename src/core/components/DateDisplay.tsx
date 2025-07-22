import { TypographyMuted } from "@core/components/ui/typography"
import { Icon } from "@core/components/ui/icon"

interface DateDisplayProps {
  date: string
  className?: string
}

export default function DateDisplay({ date, className }: DateDisplayProps): JSX.Element {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <TypographyMuted className={`font-medium flex items-center gap-1 ${className || ""}`}>
      <Icon className="text-xs sm:text-sm">📅</Icon>
      {formatDate(date)}
    </TypographyMuted>
  )
}