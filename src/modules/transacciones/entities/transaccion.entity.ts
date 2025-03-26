import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
