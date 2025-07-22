import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">): JSX.Element {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-1 text-base text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400 shadow-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20",
        "aria-invalid:border-red-500 dark:aria-invalid:border-red-400 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
