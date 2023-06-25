import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth, { IBasicAuthedRequest } from 'express-basic-auth';
import env from './env.config';

const getUnauthorizedResponse = (req: IBasicAuthedRequest): string => {
  return req.auth
    ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
    : 'No credentials provided';
};

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Customer City API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: { [env().swaggerUsername]: env().swaggerPassword },
      unauthorizedResponse: getUnauthorizedResponse,
    }),
  );

  SwaggerModule.setup('docs', app, document);
};
