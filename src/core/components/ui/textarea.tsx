import { forwardRef, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none resize-vertical text-base sm:text-lg text-gray-900 dark:text-slate-100 leading-relaxed transition-all duration-200 placeholder-gray-400 dark:placeholder-slate-400",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }