import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post('transacciones')
  createTransaccion(@Body() createTransaccioneDto: CreateTransaccioneDto) {
    return this.transaccionesService.createTransaccion(createTransaccioneDto);
  }

  @Post('post-categoria')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.transaccionesService.createCategoriaTransaccion(
      createCategoriaDto,
    );
  }

  @Get('allcategorias')
  findAll() {
    return this.transaccionesService.findAllCategorias();
  }

  @Get('')
  findAllTransacciones() {
    return this.transaccionesService.findAllTransacciones();
  }

  @Get('user/:idUser')
  async findByUsuario(@Param('idUser') idUser: string) {
    return await this.transaccionesService.findAllTransaccionesByUsuario(
      +idUser,
    );
  }

  @Get('user/presupuesto/:idUser')
  async findPresupuestoUser(@Param('idUser') idUser: string) {
    return await this.transaccionesService.findAllPresupuestoGeneralByUsuario(
      +idUser,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransaccioneDto: UpdateTransaccioneDto,
  ) {
    return this.transaccionesService.update(+id, updateTransaccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesService.remove(+id);
  }
}
