import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaEntity } from './entities/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaEntity])],
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}
