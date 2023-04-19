import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException, BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      messages: [],
    };
    let statusCode = 500;

    if (exception instanceof BadRequestException) {
      const { message } = (exception.getResponse() as { message: string|[] });
      if (typeof message === 'string') {
        responseBody.messages.push(message);
      } else {
        responseBody.messages = [...responseBody.messages, ...message];
      }
      statusCode = exception.getStatus();
    } else if (exception instanceof HttpException)  {
      responseBody.messages.push(exception.getResponse());
      statusCode = exception.getStatus();
    } else {
      responseBody.messages.push('Internal Server Error');
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
