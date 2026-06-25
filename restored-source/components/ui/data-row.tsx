import * as React from "react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface DataTableProps {
  columns?: React.ReactNode[]
  children: React.ReactNode
  empty?: React.ReactNode
  gridClassName?: string
  className?: string
}

export function DataTable({
  columns,
  children,
  empty,
  gridClassName = "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
  className,
}: DataTableProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border bg-card", className)}>
      {columns && columns.length > 0 && (
        <div className={cn("grid gap-4 border-b bg-muted/50 px-4 py-3 text-xs font-semibold text-muted-foreground", gridClassName)}>
          {columns.map((col, i) => (
            <div key={i} className="flex items-center">{col}</div>
          ))}
        </div>
      )}
      <div className="divide-y">
        {React.Children.count(children) > 0 ? children : empty}
      </div>
    </div>
  )
}

export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gridClassName?: string
  selectable?: boolean
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function DataRow({
  gridClassName,
  selectable,
  selected,
  onClick,
  children,
  className,
  ...props
}: DataRowProps) {
  return (
    <div
      onClick={onClick}
      role={selectable ? "button" : undefined}
      className={cn(
        "grid items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50",
        selectable && "cursor-pointer",
        selected && "bg-primary/5 hover:bg-primary/10",
        gridClassName,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ActivityRowProps {
  title: string
  detail?: string
  icon?: LucideIcon
  tone?: "neutral" | "primary" | "success" | "warning" | "alert" | "info"
  href?: string
  meta?: React.ReactNode
  action?: React.ReactNode
  selected?: boolean
  className?: string
}

export function ActivityRow({
  title,
  detail,
  icon: Icon,
  tone = "primary",
  href,
  meta,
  action,
  selected = false,
  className,
}: ActivityRowProps) {
  const toneIconColors = {
    neutral: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
    warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
    alert: "bg-destructive/10 text-destructive",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  }

  const iconClass = toneIconColors[tone] || toneIconColors.primary

  const content = (
    <article
      className={cn(
        "group flex min-h-[4rem] items-center gap-4 rounded-lg border px-4 py-3 transition-colors",
        selected
          ? "border-primary bg-primary/5"
          : "bg-card hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
            iconClass
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        {detail && (
          <p className="mt-1 truncate text-xs text-muted-foreground group-hover:text-accent-foreground/70">
            {detail}
          </p>
        )}
      </div>
      {(meta || action) && (
        <div className="flex items-center gap-3 shrink-0">
          {meta && <div className="text-xs text-muted-foreground">{meta}</div>}
          {action}
        </div>
      )}
    </article>
  )

  if (href) {
    return (
      <Link href={href} className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {content}
      </Link>
    )
  }

  return content
}
