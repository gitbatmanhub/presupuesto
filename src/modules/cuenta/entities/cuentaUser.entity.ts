import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/user/entities/user.entity';
import { CuentaEntity } from './cuenta.entity';

@Entity({ name: 'cuentaUser' })
export class CuentaUserEntity {
  @PrimaryGeneratedColumn()
  cuentaUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.idUser, { eager: true })
  userId: UserEntity | number;

  @ManyToOne(() => CuentaEntity, (cuenta) => cuenta.cuentaId, { eager: true })
  cuentaId: CuentaEntity | number;
}
