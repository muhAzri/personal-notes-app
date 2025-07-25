import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 dark:bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-700",
        destructive:
          "bg-red-600 dark:bg-red-600 text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-700",
        outline:
          "border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700",
        secondary:
          "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-100 shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600",
        ghost:
          "text-gray-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }): JSX.Element {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
