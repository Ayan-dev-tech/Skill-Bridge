import * as React from "react"
import { cn } from "@/lib/utils"

export function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-heading scroll-m-20 text-2xl font-bold tracking-tight text-foreground lg:text-3xl",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-heading scroll-m-20 text-xl font-semibold tracking-tight text-foreground first:mt-0 lg:text-2xl",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-heading scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "font-heading scroll-m-20 text-base font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

export function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-relaxed text-sm text-foreground/90 [&:not(:first-child)]:mt-2", className)}
      {...props}
    />
  )
}

export function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-base text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

export function TypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-base font-semibold text-foreground", className)} {...props} />
  )
}

export function TypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      className={cn("text-xs font-medium leading-none text-muted-foreground", className)}
      {...props}
    />
  )
}

export function TypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  )
}

export function TypographyInlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}
