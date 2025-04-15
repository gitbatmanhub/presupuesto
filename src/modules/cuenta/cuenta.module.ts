import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaEntity } from './entities/cuenta.entity';
import { TipoCuentaEntity } from './entities/tipoCuenta.entity';
import { CuentaUserEntity } from './entities/cuentaUser.entity';
import { UserModule } from '../auth/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CuentaEntity,
      TipoCuentaEntity,
      CuentaUserEntity,
    ]),
    UserModule,
  ],
  controllers: [CuentaController],
  providers: [CuentaService],
  exports: [CuentaService],
})
export class CuentaModule {}
