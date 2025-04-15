import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CuentaModule } from './modules/cuenta/cuenta.module';
import { TransaccionesModule } from './modules/transacciones/transacciones.module';
import { UserModule } from './modules/auth/user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOSTDB,
      port: +process.env.PORTDB,
      username: process.env.USERNAMEDB,
      password: process.env.PASSWORDDB,
      schema: process.env.SCHEMADB,
      synchronize: true,
      database: process.env.DATABASEDB,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),

    AuthModule,
    CuentaModule,
    UserModule,
    TransaccionesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
