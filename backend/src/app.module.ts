import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [User],
      dbName: 'postgres',
      user: 'postgres',
      password: 'postgres',
      driver: PostgreSqlDriver,
      port: 5432,
    }),
    AuthModule,
  ],
})
export class AppModule {}