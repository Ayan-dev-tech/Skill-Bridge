"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />,
        info: <Info className="size-4 text-blue-500 shrink-0" />,
        warning: <AlertTriangle className="size-4 text-amber-500 shrink-0" />,
        error: <XCircle className="size-4 text-destructive shrink-0" />,
        loading: <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans text-xs sm:text-sm",
          description: "group-[.toast]:text-muted-foreground text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium text-xs rounded-lg",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium text-xs rounded-lg",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
