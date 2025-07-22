import { Icon } from "@/components/ui/icon"
import { TypographyP } from "@/components/ui/typography"

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <Icon className="text-4xl">⏳</Icon>
      <TypographyP className="ml-4 text-xl text-gray-900 font-medium">
        Loading...
      </TypographyP>
    </div>
  )
}