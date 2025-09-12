import type * as React from "react"
import { forwardRef } from "react"

import { cn } from "@/lib/utils"

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "flex h-12 w-full min-w-0 rounded-lg border-2 border-border bg-background px-4 py-3",
        "text-lg font-medium shadow-sm transition-all duration-200",
        "placeholder:font-normal placeholder:text-muted-foreground/70",
        "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none",
        "hover:border-primary/50 hover:shadow-md",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        // Melhor contraste no modo escuro
        "dark:bg-card dark:border-border dark:shadow-lg",
        "dark:focus-visible:ring-primary/30 dark:hover:border-primary/60",
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
