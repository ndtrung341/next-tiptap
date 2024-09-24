import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      // Convert to nearest compatible ascii chars
      .normalize('NFKD')
      // Remove characters that aren’t alphanumerics, underscores, hyphens, or whitespace
      .replace(/[^\w\s-]+/g, '')
      // Replace any whitespace or repeated dashes with single dashes
      .replace(/[-\s]+/g, '-')
      // Remove leading and trailing whitespace, dashes, and underscores
      .replace(/^[\s-_]+|[\s-_]+$/g, '')
  );
}
