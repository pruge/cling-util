import {PrismaClientKnownRequestError, prismaError} from 'prisma-better-errors'
import {CustomError} from 'ts-custom-error'
import {ZodError} from 'zod'

export class BaseError extends CustomError {
  code: number | undefined
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string, code?: number) {
    super(message, code)
  }
}

//---------------------------------------------------------------------------------------------
// Error Source Check
//---------------------------------------------------------------------------------------------
export function isZodError(err: unknown): err is ZodError {
  return Boolean(err && (err instanceof ZodError || (err as ZodError).name === 'ZodError'))
}
//---------------------------------------------------------------------------------------------
export function isCustomError(err: unknown): err is CustomError {
  return Boolean(err && (err instanceof CustomError || (err as CustomError).name === 'CustomError'))
}
//---------------------------------------------------------------------------------------------
export function isPrismaError(err: unknown): err is PrismaClientKnownRequestError {
  return Boolean(err && (err as PrismaClientKnownRequestError).name === 'PrismaClientKnownRequestError')
}
//---------------------------------------------------------------------------------------------
// Pretty Error Object
//---------------------------------------------------------------------------------------------
export function getPrettyError(err: unknown): {code?: number; message: string} {
  if (isZodError(err)) {
    return {code: 400, message: `${err.issues[0].path[0]}: ${err.issues[0].message}`}
  } else if (isCustomError(err)) {
    return {code: (err as BaseError).code, message: (err as BaseError).message}
  } else if (isPrismaError(err)) {
    const e = new prismaError(err)
    let metaData = ''
    if (typeof e.metaData === 'object') {
      for (const key in e.metaData as unknown as object) {
        metaData += `${key}: ${e.metaData[key]}, `
      }
    } else {
      metaData = e.metaData as string
    }
    return {code: e.statusCode, message: e.message + ': ' + metaData}
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }
    return {code: 500, message: 'Internal Server Error'}
  }
}
//---------------------------------------------------------------------------------------------
