import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
/**
 * server component에서 사용 가능
 *
 * const headersList = headers()
 * const isMobile = isMobileUserAgent(headersList.get('user-agent') ?? '')
 */
export declare function isMobileUserAgent(userAgent: string): boolean;
export declare function toCapitalize(input: string): string;
