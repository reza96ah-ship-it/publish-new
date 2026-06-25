import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  detail?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  detail,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-4">
          <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        </div>
      )}
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      {detail && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          {detail}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
