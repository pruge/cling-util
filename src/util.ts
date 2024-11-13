import {clsx, type ClassValue} from 'clsx'
import {dir} from 'node:console'
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const arraySortByKey = (arr: any[], key: string, direction: 'asc' | 'desc' = 'asc') => {
//   return arr.sort((a, b) => {
//     if (a[key] < b[key]) {
//       return direction === 'asc' ? -1 : 1
//     }
//     if (a[key] > b[key]) {
//       return direction === 'asc' ? 1 : -1
//     }
//     return 0
//   })
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arraySortByKey = (arr: any[], options: Record<string, 'asc' | 'desc'>) => {
  const standard: Record<string, -1 | 1> = {}
  for (const key in options) {
    standard[key] = options[key] === 'asc' ? -1 : 1
  }

  return arr.sort((a, b) => {
    for (const key in standard) {
      const first = a[key]
      const second = b[key]
      if (first !== second) {
        return standard[key] * (first < second ? 1 : -1)
      }
    }
    return 0
  })
}

export const pick = <T>(obj: T, ...props: (keyof T)[]) => {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop]
    return result
  }, {} as Partial<T>)
}

export const omit = <T>(obj: T, ...props: (keyof T)[]) => {
  const result = {...obj}
  props.forEach(function (prop) {
    delete result[prop]
  })
  return result
}

export const isEqualObject = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

export const generateUrl = (path: string, query: Record<string, string> = {}) => {
  const url = new URL(path, window.location.origin)
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value)
  }
  return '/' + url.toString().split('/').slice(3).join('/')
}

/**
 * isEmpty
 */
export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * getValue with default
 */
export const getValue = <T = unknown>(value: T, defaultValue: T) => {
  if (isEmpty(value)) return defaultValue
  return value
}
