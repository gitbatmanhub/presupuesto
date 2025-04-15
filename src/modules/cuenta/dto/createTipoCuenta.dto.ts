import { IsString } from 'class-validator';

export class CreateTipoCuentaDto {
  @IsString()
  nombreTipoCuenta: string;
}
