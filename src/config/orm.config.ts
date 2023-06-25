import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { truncate } from 'fs/promises';
import parseDBUrl from 'parse-database-url';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import env from './env.config';
import { join } from 'path';

const config = parseDBUrl(env().databaseURL);

const useSSL = !env().isDevelopment;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  synchronize: true, // this project uses migrations
  logging: false,
  autoLoadEntities: true,
  ...(useSSL && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  namingStrategy: new SnakeNamingStrategy(),
};

const ormConfig = {
  ...typeOrmConfig,
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default ormConfig;
