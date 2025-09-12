import type * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "flex min-h-20 w-full rounded-lg border-2 border-border bg-background px-4 py-3",
        "text-lg font-medium shadow-sm transition-all duration-200 resize-vertical",
        "placeholder:font-normal placeholder:text-muted-foreground/70",
        "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none",
        "hover:border-primary/50 hover:shadow-md",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        // Melhor contraste no modo escuro
        "dark:bg-card dark:border-border dark:shadow-lg",
        "dark:focus-visible:ring-primary/30 dark:hover:border-primary/60",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
