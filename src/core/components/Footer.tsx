import { useTranslation } from '@core/application/hooks/useTranslation';

export default function Footer(): JSX.Element {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-slate-400">
          <div className="text-center sm:text-left">
            {t('footer.copyright')}
          </div>
          <div className="text-center sm:text-right">
            {t('footer.poweredBy')}
          </div>
        </div>
      </div>
    </footer>
  );
}