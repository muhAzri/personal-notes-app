import { Button } from "@core/components/ui/button"
import { IconLarge } from "@core/components/ui/icon"
import { TypographyH2, TypographyP } from "@core/components/ui/typography"

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction 
}: EmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-12 sm:py-16">
      <IconLarge className="mb-4 sm:mb-6">{icon}</IconLarge>
      <TypographyH2 className="mb-3 sm:mb-4">{title}</TypographyH2>
      <TypographyP className="text-base sm:text-lg max-w-sm sm:max-w-md mx-auto px-4">
        {description}
      </TypographyP>
      {actionLabel && (
        <div className="mt-6 sm:mt-8">
          {actionHref ? (
            <Button asChild className="shadow-soft hover:shadow-medium">
              <a href={actionHref}>
                {actionLabel}
              </a>
            </Button>
          ) : (
            <Button onClick={onAction} className="shadow-soft hover:shadow-medium">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}