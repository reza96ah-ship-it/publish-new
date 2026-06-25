import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

export function toPersianDigits(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
