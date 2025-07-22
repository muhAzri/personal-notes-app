import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTranslation } from '@core/application/hooks/useTranslation';

interface NavItemProps {
  to: string
  children: ReactNode
  variant?: 'default' | 'warning' | 'secondary'
}

function NavItem({ to, children, variant = 'default' }: NavItemProps): JSX.Element {
  const activeVariants = {
    default: 'bg-blue-600 dark:bg-blue-500 text-white dark:text-white shadow-md ring-2 ring-blue-200 dark:ring-blue-400/50',
    warning: 'bg-orange-600 dark:bg-orange-500 text-white dark:text-white shadow-md ring-2 ring-orange-200 dark:ring-orange-400/50',
    secondary: 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-white shadow-md ring-2 ring-emerald-200 dark:ring-emerald-400/50'
  }

  const inactiveVariants = {
    default: 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 transition-colors',
    warning: 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 transition-colors',
    secondary: 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-900 dark:hover:text-emerald-100 border border-emerald-200 dark:border-slate-600 transition-colors'
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

export default function Navigation(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-end">
      <NavItem to="/">
        <span className="sm:hidden">📋</span>
        <span className="hidden sm:inline">📋 {t('nav.notes')}</span>
      </NavItem>
      <NavItem to="/archived" variant="warning">
        <span className="sm:hidden">📦</span>
        <span className="hidden sm:inline">📦 {t('nav.archived')}</span>
      </NavItem>
      <NavItem to="/notes/new" variant="secondary">
        <span className="sm:hidden">✏️</span>
        <span className="hidden sm:inline">✏️ {t('nav.add')}</span>
      </NavItem>
    </div>
  )
}