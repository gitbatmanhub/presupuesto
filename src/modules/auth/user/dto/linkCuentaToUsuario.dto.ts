import { IsNumber } from 'class-validator';

export class LinkCuentaToUsuarioDto {
  @IsNumber()
  userIdIdUser: number;

  @IsNumber()
  cuentaIdCuentaId: number;
}
