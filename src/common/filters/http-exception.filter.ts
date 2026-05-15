import type { 
    ArgumentsHost, 
    ExceptionFilter
} from "@nestjs/common";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
    }
}