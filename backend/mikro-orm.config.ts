import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'postgres',
  user: 'postgres',
  password: 'postgres',
  driver: PostgreSqlDriver,
  port: 5432,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
};

export default config;