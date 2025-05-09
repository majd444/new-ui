import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This is used by shadcn components for class name merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
