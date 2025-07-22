import { Icon } from "@/components/ui/icon"
import { TypographyP } from "@/components/ui/typography"

export function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <Icon className="text-4xl">⏳</Icon>
      <TypographyP className="ml-4 text-xl text-gray-900 dark:text-slate-100 font-medium">
        Loading...
      </TypographyP>
    </div>
  )
}

export default LoadingState;