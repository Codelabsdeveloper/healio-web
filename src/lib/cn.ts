import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names with Tailwind-friendly conflict resolution.
 * Use for conditional and composed className props.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
