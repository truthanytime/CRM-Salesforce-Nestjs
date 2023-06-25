import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseObject } from '../http';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GenericExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'An error occurred';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    this.logUnknownException(exception);

    response.status(status).json(new ErrorResponseObject(message));
  }

  private logUnknownException(exception: unknown) {
    const isInternalServerHttpException =
      exception instanceof InternalServerErrorException;

    const isNotHttpException = !(exception instanceof HttpException);

    if (
      exception instanceof Error &&
      (isInternalServerHttpException || isNotHttpException)
    ) {
      this.logger.error(exception.message, exception.stack);
    }
  }
}
