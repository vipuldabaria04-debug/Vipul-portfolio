import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number with a "+" style count-up target, e.g. for animated stats. */
export function formatStat(value: number, suffix = ""): string {
  return `${value}${suffix}`;
}
