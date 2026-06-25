import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  action?: React.ReactNode
  bodyClassName?: string
}

export function Section({
  title,
  description,
  action,
  children,
  className,
  bodyClassName = "mt-4",
  ...props
}: SectionProps) {
  return (
    <Card className={cn("p-4 sm:p-5", className)} {...props}>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </Card>
  )
}
