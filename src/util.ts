import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * server component에서 사용 가능
 *
 * const headersList = headers()
 * const isMobile = isMobileUserAgent(headersList.get('user-agent') ?? '')
 */
export function isMobileUserAgent(userAgent: string) {
  return /iPhone|iPad|iPod|Android/i.test(userAgent)
}

export function toCapitalize(input: string) {
  input = input.replace(/-/g, ' ')
  if (typeof input !== 'string' || input.length === 0) {
    return ''
  }
  return input.charAt(0).toUpperCase() + input.slice(1)
}
