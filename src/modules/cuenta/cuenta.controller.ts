import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { CreateTipoCuentaDto } from './dto/createTipoCuenta.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}

  @Post('createCuenta')
  @UseGuards(JwtAuthGuard)
  createCuenta(@Body() createCuentaDto: CreateCuentaDto) {
    return this.cuentaService.createCuentaUser(createCuentaDto);
  }

  @Post('createTipoCuenta')
  @UseGuards(JwtAuthGuard)
  createTipoCuenta(@Body() createTipoCuentaDto: CreateTipoCuentaDto) {
    return this.cuentaService.createTipoCuenta(createTipoCuentaDto);
  }
}
