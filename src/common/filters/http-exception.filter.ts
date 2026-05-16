import {
    HttpException,
    HttpStatus,
    type ArgumentsHost,
    type ExceptionFilter
} from "@nestjs/common";
import type { Request, Response } from "express";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const exceptionResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : "Internal server error";

        const message =
            typeof exceptionResponse === "string"
                ? exceptionResponse
                : ((exceptionResponse as Record<string, unknown>).message ??
                    exceptionResponse);

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}