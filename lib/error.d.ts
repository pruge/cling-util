import { PrismaClientKnownRequestError } from 'prisma-better-errors';
import { CustomError } from 'ts-custom-error';
import { ZodError } from 'zod';
export declare class BaseError extends CustomError {
    code: number | undefined;
    constructor(message: string, code?: number);
}
export declare class AuthorizationError extends BaseError {
    constructor(message: string, code?: number);
}
export declare function isZodError(err: unknown): err is ZodError;
export declare function isCustomError(err: unknown): err is CustomError;
export declare function isPrismaError(err: unknown): err is PrismaClientKnownRequestError;
export declare function getPrettyError(err: unknown): {
    code?: number;
    message: string;
};
