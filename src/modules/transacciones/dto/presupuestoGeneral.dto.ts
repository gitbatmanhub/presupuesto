import { CuentaUserEntity } from '../../cuenta/entities/cuentaUser.entity';
import { TransaccionEntity } from '../entities/transaccion.entity';

export class PresupuestoGeneralDTO {
  CuentaUser: CuentaUserEntity;
  ingresos: TransaccionEntity[];
  sumaIngresos: number;
  egresos: TransaccionEntity[];
  sumaEgresos: number;
}
