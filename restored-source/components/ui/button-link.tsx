import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Button, type SharedButtonProps } from "./button";

export type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: SharedButtonProps["variant"];
  size?: SharedButtonProps["size"];
  children: ReactNode;
  disabled?: boolean;
};

export function ButtonLink({ href, variant = "primary", size = "md", children, disabled, ...props }: ButtonLinkProps) {
  return (
    <Button href={href} variant={variant} size={size} disabled={disabled} {...props}>
      {children}
    </Button>
  );
}

