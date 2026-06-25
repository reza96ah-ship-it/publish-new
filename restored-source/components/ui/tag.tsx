import type { ReactNode } from "react";
import { Badge } from "./badge";

type TagTone = "neutral" | "primary" | "success" | "warning" | "alert" | "info" | "dark";

type TagProps = {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
};

export function Tag({ tone = "neutral", children, className = "" }: TagProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "secondary";
  if (tone === "primary") variant = "default";
  if (tone === "success") variant = "success";
  if (tone === "warning") variant = "warning";
  if (tone === "alert") variant = "destructive";
  if (tone === "info") variant = "default";
  
  return (
    <Badge variant={variant} className={className}>
      {children}
    </Badge>
  );
}

