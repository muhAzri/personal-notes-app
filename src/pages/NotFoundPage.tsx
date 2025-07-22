import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { IconMedium } from "@/components/ui/icon"

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 sm:py-20 px-4">
      <div className="mb-6 sm:mb-8">
        <div className="text-primary text-6xl sm:text-9xl font-bold mb-3 sm:mb-4">404</div>
        <IconMedium>🔍</IconMedium>
      </div>
      <TypographyH1 className="mb-3 sm:mb-4">Page Not Found</TypographyH1>
      <TypographyP className="text-base sm:text-xl mb-8 sm:mb-12 max-w-sm sm:max-w-md mx-auto">
        Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
      </TypographyP>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        <Button
          onClick={() => void navigate('/')}
          className="w-full sm:w-auto bg-primary hover:bg-blue-700 shadow-soft hover:shadow-medium"
        >
          📋 View Notes
        </Button>
        <Button
          onClick={() => void navigate(-1)}
          variant="outline"
          className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white"
        >
          ← Go Back
        </Button>
      </div>
      <div className="mt-8 sm:mt-12 text-gray-600">
        <TypographyP className="text-sm sm:text-base">Lost? Try these popular sections:</TypographyP>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-3 sm:mt-4">
          <a
            href="/"
            className="text-primary hover:text-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Notes
          </a>
          <a
            href="/archived"
            className="text-warning hover:text-amber-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Archived Notes
          </a>
          <a
            href="/notes/new"
            className="text-secondary hover:text-emerald-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Add Note
          </a>
        </div>
      </div>
    </div>
  );
}