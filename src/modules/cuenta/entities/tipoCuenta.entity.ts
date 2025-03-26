import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipoCuenta' })
export class TipoCuentaEntity {
  @PrimaryGeneratedColumn()
  tipoCuentaId: number;

  @Column()
  nombreTipoCuenta: string;
}
