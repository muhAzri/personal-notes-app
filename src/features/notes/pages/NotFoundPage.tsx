import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Plus, Archive } from 'lucide-react';
import { Button } from "@core/components/ui/button";
import { Card, CardContent } from "@core/components/ui/card";
import { TypographyH1, TypographyP, TypographyH2 } from "@core/components/ui/typography";
import { useTranslation } from '@core/application/hooks/useTranslation';

export default function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4 py-8">
      <Card className="max-w-2xl w-full">
        <CardContent className="text-center p-8 sm:p-12">
          {/* Large 404 with gradient */}
          <div className="mb-8">
            <div className="text-6xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              404
            </div>
            <div className="text-4xl mb-4">🔍</div>
          </div>

          {/* Main message */}
          <div className="mb-8">
            <TypographyH1 className="mb-4 text-gray-900 dark:text-slate-100">
              {t('404.title')}
            </TypographyH1>
            <TypographyP className="text-lg text-gray-600 dark:text-slate-300 max-w-md mx-auto">
              {t('404.description')}
            </TypographyP>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={() => void navigate('/')}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              {t('404.goToNotes')}
            </Button>
            <Button
              onClick={() => void navigate(-1)}
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('404.goBack')}
            </Button>
          </div>

          {/* Quick navigation */}
          <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
            <TypographyH2 className="text-base font-semibold mb-4 text-gray-900 dark:text-slate-100">
              {t('404.quickNav')}
            </TypographyH2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant="ghost"
                onClick={() => void navigate('/')}
                className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 dark:hover:bg-slate-800"
              >
                <Home className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">{t('404.allNotes')}</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">{t('404.allNotesDesc')}</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => void navigate('/archived')}
                className="flex flex-col items-center p-4 h-auto hover:bg-amber-50 dark:hover:bg-slate-800"
              >
                <Archive className="w-6 h-6 mb-2 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium">{t('404.archived')}</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">{t('404.archivedDesc')}</span>
              </Button>

              <Button
                variant="ghost"
                onClick={() => void navigate('/notes/new')}
                className="flex flex-col items-center p-4 h-auto hover:bg-emerald-50 dark:hover:bg-slate-800"
              >
                <Plus className="w-6 h-6 mb-2 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium">{t('404.createNew')}</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">{t('404.createNewDesc')}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}