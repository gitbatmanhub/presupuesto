import { IsBoolean, IsNumber } from 'class-validator';

export class CreateCuentaDto {
  @IsNumber()
  tipoCuentaId;

  @IsNumber()
  saldo: number;

  @IsNumber()
  saldoFavor: number;

  @IsNumber()
  saldoContra: number;

  @IsBoolean()
  cuentaContabilidad: boolean;
}
