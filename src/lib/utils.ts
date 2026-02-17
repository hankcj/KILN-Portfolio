/**
 * General Utilities
 */

// Format date to display format
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

// Format date range
export function formatDateRange(start: Date | string, end?: Date | string): string {
  const startStr = formatDate(start);
  if (!end) return startStr;
  
  const endStr = formatDate(end);
  return `${startStr} — ${endStr}`;
}

// Generate slug from string
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Class name utility (lightweight alternative to clsx)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Check if element is in viewport
export function isInViewport(element: Element, offset: number = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Scroll to element smoothly
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Generate unique ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
