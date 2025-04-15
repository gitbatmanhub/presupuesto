import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { CreateTipoCuentaDto } from './dto/createTipoCuenta.dto';

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

  /* @Post('create-cuenta-user')
   createCuentaUser(@Body() createUserCuentaDto: CreateCuentaUserDto) {
     return this.cuentaService.linkCuentaToUsuario(createUserCuentaDto);
   }*/

  @Get()
  findAll() {
    return this.cuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaService.remove(+id);
  }
}
