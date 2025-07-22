import { TypographyH1, TypographyP } from "@/components/ui/typography"

import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
      <div>
        <TypographyH1 className="mb-1 sm:mb-2">{title}</TypographyH1>
        <TypographyP>{description}</TypographyP>
      </div>
      {actions && (
        <div className="text-left sm:text-right">
          {actions}
        </div>
      )}
    </div>
  )
}