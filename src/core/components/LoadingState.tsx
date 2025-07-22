import { Icon } from "@core/components/ui/icon"
import { TypographyP } from "@core/components/ui/typography"
import { useTranslation } from "@core/application/hooks/useTranslation"

export function LoadingState(): JSX.Element {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center items-center h-64">
      <Icon className="text-4xl">⏳</Icon>
      <TypographyP className="ml-4 text-xl text-gray-900 dark:text-slate-100 font-medium">
        {t('common.loading')}
      </TypographyP>
    </div>
  )
}

export default LoadingState;