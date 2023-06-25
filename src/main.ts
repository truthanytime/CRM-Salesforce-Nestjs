import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { GenericExceptionFilter } from './common/exception-filters/generic-exception.filter';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { ValidationExceptionFilter } from './common/exception-filters/validation-exception.filter';
import env from './config/env.config';
import { setupSwagger } from './config/swagger.config';
import { TransformInterceptor } from './data-raptor/interceptors/transform.interceptor';

const corsOrigin = env().isDevelopment ? '*' : env().frontEndUrl;

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

initializeTransactionalContext();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });

  // logger set up
  // app.useLogger(app.get(Logger));

  // register validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // register transformation interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // register exception filters
  app.useGlobalFilters(
    new GenericExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  setupSwagger(app);

  // init helmet config
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
