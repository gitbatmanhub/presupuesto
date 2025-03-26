import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CuentaModule } from './modules/cuenta/cuenta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      schema: 'presupuesto',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      database: 'presupuesto',
    }),
    AuthModule,
    CuentaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
