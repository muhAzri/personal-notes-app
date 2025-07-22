import { Outlet } from 'react-router-dom';
import { TypographyH1 } from "@/components/ui/typography"
import Navigation from "@/components/Navigation"

export default function Layout(): JSX.Element {
  return (
    <div className="min-h-screen bg-light-background text-light-on-background font-inter">
      <header className="bg-white shadow-soft border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <TypographyH1 className="text-lg sm:text-2xl">📝 Notes App</TypographyH1>
            <Navigation />
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}