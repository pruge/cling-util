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
export declare const arraySortByKey: (arr: any[], options: Record<string, 'asc' | 'desc'>) => any[];
export declare const pick: <T>(obj: T, ...props: (keyof T)[]) => Partial<T>;
export declare const omit: <T>(obj: T, ...props: (keyof T)[]) => T;
export declare const isEqualObject: (a: Record<string, unknown>, b: Record<string, unknown>) => boolean;
export declare const generateUrl: (path: string, query?: Record<string, string>) => string;
