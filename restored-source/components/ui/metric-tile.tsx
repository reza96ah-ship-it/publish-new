import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface MetricTileProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  detail?: string;
  icon?: LucideIcon;
  variant?: "glass" | "solid";
  tone?: "neutral" | "primary" | "success" | "warning" | "alert" | "info";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MetricTile({
  label,
  value,
  change,
  detail,
  icon: Icon,
  variant = "glass",
  tone = "neutral",
  className,
  onClick,
  href,
}: MetricTileProps) {
  const changeColor = {
    up: "text-emerald-600",
    down: "text-rose-600",
    neutral: "text-slate-600",
  }[change?.direction || "neutral"];

  const toneIconColors = {
    neutral: "bg-app-soft text-app-primary",
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
    warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
    alert: "bg-destructive/10 text-destructive",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  };
  
  const iconClass = toneIconColors[tone] || toneIconColors.neutral;

  const baseClass = variant === "glass"
    ? "bg-card text-card-foreground border"
    : "bg-card border";

  const content = (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p className={cn("text-xs font-medium mt-1.5", changeColor)}>
            {change.direction === "up" ? "↑" : change.direction === "down" ? "↓" : "→"} {Math.abs(change.value)}
            {change.label && ` ${change.label}`}
          </p>
        )}
        {detail && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{detail}</p>}
      </div>
      {Icon && (
        <div className={cn("flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center", iconClass)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </div>
  );

  const combinedClassName = cn(
    "rounded-lg p-4 transition-all hover:shadow-md block",
    baseClass,
    (onClick || href) && "cursor-pointer hover:scale-105 hover:-translate-y-0.5",
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  const interactiveProps = onClick
    ? {
        onClick,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        },
        role: "button",
        tabIndex: 0
      }
    : {};

  return (
    <div className={combinedClassName} {...interactiveProps}>
      {content}
    </div>
  );
}


