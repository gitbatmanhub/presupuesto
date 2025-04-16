import { Body, Controller, Get, Post } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { CreateTipoCuentaDto } from './dto/createTipoCuenta.dto';
import { CuentaEntity } from './entities/cuenta.entity';
import { TipoCuentaEntity } from './entities/tipoCuenta.entity';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}

  @Post('createCuenta')
  createCuenta(@Body() createCuentaDto: CreateCuentaDto) {
    return this.cuentaService.createCuentaUser(createCuentaDto);
  }

  @Post('createTipoCuenta')
  createTipoCuenta(@Body() createTipoCuentaDto: CreateTipoCuentaDto) {
    return this.cuentaService.createTipoCuenta(createTipoCuentaDto);
  }

  @Get()
  getAllCuentas(): Promise<CuentaEntity[]> {
    return this.cuentaService.findAllCuentas();
  }

  @Get('tipos')
  getAllTiposCuentas(): Promise<TipoCuentaEntity[]> {
    return this.cuentaService.findAllTiposCuentas();
  }
}
