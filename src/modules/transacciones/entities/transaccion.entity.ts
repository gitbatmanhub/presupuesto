import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CuentaUserEntity } from '../../cuenta/entities/cuentaUser.entity';
import { CategoriaEntity } from './categoria.entity';

@Entity({ name: 'transaccion' })
export class TransaccionEntity {
  @PrimaryGeneratedColumn()
  transaccionId: number;

  @ManyToOne(() => CuentaUserEntity, (cuentaUser) => cuentaUser.cuentaUserId)
  userCuentaId: number;

  @ManyToOne(
    () => CategoriaEntity,
    (categoriaEntity) => categoriaEntity.categoriaId,
  )
  categoriaId: number;

  @Column({ type: 'enum', enum: ['INGRESO', 'EGRESO'] })
  tipo: 'INGRESO' | 'EGRESO';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  monto: number;
}
