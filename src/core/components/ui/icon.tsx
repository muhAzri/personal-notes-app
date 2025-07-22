interface IconProps {
  children: string
  className?: string
}

export function Icon({ children, className = "text-base sm:text-lg" }: IconProps): JSX.Element {
  return <span className={className}>{children}</span>
}

export function IconLarge({ children, className }: IconProps): JSX.Element {
  return <Icon className={`text-6xl sm:text-8xl ${className || ""}`}>{children}</Icon>
}

export function IconMedium({ children, className }: IconProps): JSX.Element {
  return <Icon className={`text-4xl sm:text-6xl ${className || ""}`}>{children}</Icon>
}