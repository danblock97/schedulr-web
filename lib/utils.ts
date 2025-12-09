import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date as a relative time string (e.g., "2h ago", "3d ago", "2w ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    Math.abs(date.getTime() - now.getTime()) / 1000,
  );
  const isFuture = date.getTime() > now.getTime();

  if (diffInSeconds < 60) {
    return isFuture ? 'in <1m' : 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return isFuture ? `in ${diffInMinutes}m` : `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return isFuture ? `in ${diffInHours}h` : `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return isFuture ? `in ${diffInDays}d` : `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return isFuture ? `in ${diffInWeeks}w` : `${diffInWeeks}w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return isFuture ? `in ${diffInMonths}mo` : `${diffInMonths}mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return isFuture ? `in ${diffInYears}y` : `${diffInYears}y ago`;
}

