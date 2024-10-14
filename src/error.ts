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
  return Boolean(
    err &&
      (err instanceof PrismaClientKnownRequestError ||
        (err as PrismaClientKnownRequestError).name === 'PrismaClientKnownRequestError'),
  )
}
// export function isPrismaError(
//   err: unknown,
// ): err is Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError {
//   return Boolean(
//     err &&
//       (err instanceof Prisma.PrismaClientKnownRequestError ||
//         err instanceof Prisma.PrismaClientValidationError ||
//         (err as Prisma.PrismaClientKnownRequestError).name === 'PrismaClientKnownRequestError' ||
//         (err as Prisma.PrismaClientValidationError).name === 'PrismaClientValidationError'),
//   )
// }
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
    return {code: e.statusCode, message: err.message + ':' + JSON.stringify(e.metaData)}
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }
    return {code: 500, message: 'Internal Server Error'}
  }
}
//---------------------------------------------------------------------------------------------
