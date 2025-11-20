import { type ClassValue, clsx } from 'clsx';
import type { InertiaLinkProps } from '@inertiajs/vue3';

/**
 * Merge class names
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Convert an Inertia href to a string URL
 */
export function toUrl(
    href: NonNullable<InertiaLinkProps['href']> | string,
): string {
    if (typeof href === 'string') {
        return href;
    }
    
    // Handle UrlMethodPair object (e.g., { url: '/path', method: 'post' })
    if (typeof href === 'object' && 'url' in href) {
        return href.url;
    }
    
    return String(href);
}

/**
 * Check if a URL matches the current page URL
 */
export function urlIsActive(
    href: NonNullable<InertiaLinkProps['href']> | string,
    currentUrl: string,
): boolean {
    const url = toUrl(href);
    
    // Remove trailing slashes for comparison
    const normalizedUrl = url.replace(/\/$/, '');
    const normalizedCurrentUrl = currentUrl.replace(/\/$/, '');
    
    // Check for exact match
    if (normalizedUrl === normalizedCurrentUrl) {
        return true;
    }
    
    // Check if current URL starts with the href (for nested routes)
    // Only match if followed by a slash or end of string
    if (normalizedCurrentUrl.startsWith(normalizedUrl + '/')) {
        return true;
    }
    
    return false;
}

