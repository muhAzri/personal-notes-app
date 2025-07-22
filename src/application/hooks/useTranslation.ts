import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { translations, TranslationKey } from '@application/localization/translations';

export const useTranslation = () => {
  const language = useAppSelector((state) => state.language.language);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t, language };
};