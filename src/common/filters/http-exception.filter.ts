import type { 
    ArgumentsHost, 
    ExceptionFilter
} from "@nestjs/common";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {}
}