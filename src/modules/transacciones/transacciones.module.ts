import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { TransaccionEntity } from './entities/transaccion.entity';
import { CategoriaEntity } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaModule } from '../cuenta/cuenta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransaccionEntity, CategoriaEntity]),
    CuentaModule,
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  exports: [TransaccionesService],
})
export class TransaccionesModule {}
