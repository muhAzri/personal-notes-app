import { cn } from "@/lib/utils"

import { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function TypographyH1({ children, className }: TypographyProps): JSX.Element {
  return (
    <h1 className={cn("text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100", className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: TypographyProps): JSX.Element {
  return (
    <h2 className={cn("text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100", className)}>
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className }: TypographyProps): JSX.Element {
  return (
    <h3 className={cn("text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100", className)}>
      {children}
    </h3>
  )
}

export function TypographyP({ children, className }: TypographyProps): JSX.Element {
  return (
    <p className={cn("text-sm sm:text-base text-gray-700 dark:text-gray-300", className)}>
      {children}
    </p>
  )
}

export function TypographyMuted({ children, className }: TypographyProps): JSX.Element {
  return (
    <p className={cn("text-xs sm:text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  )
}