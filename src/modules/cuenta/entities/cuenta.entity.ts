import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoCuentaEntity } from './tipoCuenta.entity';

@Entity({ name: 'cuenta' })
export class CuentaEntity {
  @PrimaryGeneratedColumn()
  cuentaId: string;

  @ManyToOne(() => TipoCuentaEntity, (tipoCuenta) => tipoCuenta.tipoCuentaId)
  tipoCuentaId: number;

  @Column({ type: 'float' })
  saldo: number;

  @Column({ type: 'float' })
  saldoFavor: number;

  @Column({ type: 'float' })
  saldoContra: number;

  @Column({ nullable: true })
  fechaPago: Date = new Date();

  @Column({ nullable: true })
  fechaCorte: Date = new Date();

  @Column()
  cuentaContabilidad: boolean = true;
}
