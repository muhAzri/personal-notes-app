import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

interface NavItemProps {
  to: string
  children: ReactNode
  variant?: 'default' | 'warning' | 'secondary'
}

function NavItem({ to, children, variant = 'default' }: NavItemProps) {
  const activeVariants = {
    default: 'bg-primary text-white shadow-soft',
    warning: 'bg-warning text-white shadow-soft',
    secondary: 'bg-emerald-600 text-white shadow-soft'
  }

  const inactiveVariants = {
    default: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    warning: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    secondary: 'text-emerald-700 hover:bg-secondary hover:text-white border border-emerald-200 hover:border-secondary bg-emerald-50'
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          isActive ? activeVariants[variant] : inactiveVariants[variant]
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navigation() {
  return (
    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-end">
      <NavItem to="/">
        <span className="sm:hidden">📋</span>
        <span className="hidden sm:inline">📋 Notes</span>
      </NavItem>
      <NavItem to="/archived" variant="warning">
        <span className="sm:hidden">📦</span>
        <span className="hidden sm:inline">📦 Archived Notes</span>
      </NavItem>
      <NavItem to="/notes/new" variant="secondary">
        <span className="sm:hidden">✏️</span>
        <span className="hidden sm:inline">✏️ Add Note</span>
      </NavItem>
    </div>
  )
}