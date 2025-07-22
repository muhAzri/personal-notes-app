import React from 'react';
import { Outlet } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { TypographyH1 } from "@core/components/ui/typography";
import { Button } from "@core/components/ui/button";
import { Select, SelectItem } from "@core/components/ui/select";
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { toggleTheme } from '@infrastructure/store/themeSlice';
import { setLanguage } from '@infrastructure/store/languageSlice';
import { logout } from '@infrastructure/store/authSlice';
import { useTranslation } from '@core/application/hooks/useTranslation';
import { container } from '@infrastructure/di/container';
import Navigation from "@core/components/Navigation";
import Footer from "@core/components/Footer";

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();
  const { theme } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth);

  const handleThemeToggle = (): void => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setLanguage(e.target.value as 'id' | 'en'));
  };

  const handleLogout = (): void => {
    container.logoutUseCase.execute();
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-inter transition-colors flex flex-col">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <TypographyH1 className="text-lg sm:text-2xl text-gray-900 dark:text-gray-100">{t('app.title')}</TypographyH1>
            
            <div className="flex items-center gap-4">
              <Navigation />
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  title={t('theme.toggle')}
                  className="text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  className="w-20 text-xs"
                >
                  <SelectItem value="id">🇮🇩 ID</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </Select>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-slate-300">
                    {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    {t('nav.logout')}
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}