import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { translations, TranslationKey } from '@core/application/localization/translations';

export const useTranslation = (): { t: (key: TranslationKey) => string; language: string } => {
  const language = useAppSelector((state) => state.language.language);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t, language };
};