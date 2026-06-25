import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "muted";
  children: React.ReactNode;
}

export function Panel({
  variant = "solid",
  className,
  children,
  ...props
}: PanelProps) {
  const variantClasses = {
    glass: "bg-card/95 backdrop-blur-sm",
    solid: "bg-card",
    muted: "bg-muted/50",
  };

  return (
    <Card
      className={cn(
        "transition-all border shadow-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}


