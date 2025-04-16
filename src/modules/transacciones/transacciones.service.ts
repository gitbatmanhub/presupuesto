import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { TransaccionEntity } from './entities/transaccion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CuentaService } from '../cuenta/cuenta.service';
import { PresupuestoGeneralDTO } from './dto/presupuestoGeneral.dto';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(TransaccionEntity)
    private readonly transaccionesService: Repository<TransaccionEntity>,
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
    private readonly cuentaService: CuentaService,
  ) {}

  createTransaccion(createTransaccioneDto: CreateTransaccioneDto) {
    return this.transaccionesService.save(createTransaccioneDto);
  }

  findCategoriaByName(name: string) {
    return this.categoriaRepository.findOneBy({ nameCategoria: name });
  }

  createCategoriaTransaccion(createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaRepository.save(createCategoriaDto);
  }

  findAllCategorias() {
    return this.categoriaRepository.find();
  }

  findAllTransacciones() {
    return this.transaccionesService.find();
  }

  async findAllTransaccionesByUsuario(usuarioId: number) {
    return await this.transaccionesService.findBy({
      userCuentaId: usuarioId,
    });
  }

  async findAllPresupuestoGeneralByUsuario(usuarioId: number) {
    const transacciones = await this.findAllTransaccionesByUsuario(usuarioId);
    console.table(transacciones);
    const ingresos = await this.obtenerIngresos(usuarioId);
    const egresos = await this.obtenerEgresos(usuarioId);
    const cuenta =
      await this.cuentaService.findCuentasUsuariosByIdUsuario(usuarioId);

    const presupuestoGeneral = new PresupuestoGeneralDTO();
    presupuestoGeneral.CuentaUser = cuenta[0];
    presupuestoGeneral.ingresos = ingresos;
    presupuestoGeneral.sumaIngresos = await this.sumarMontos(ingresos);
    presupuestoGeneral.egresos = egresos;
    presupuestoGeneral.sumaEgresos = await this.sumarMontos(egresos);

    return presupuestoGeneral;
  }

  async sumarMontos(listaTransacciones) {
    let monto = 0;
    for (let i = 0; i < listaTransacciones.length; i++) {
      monto += listaTransacciones[i].monto;
    }
    return monto;
  }

  async obtenerIngresos(usuarioId: number) {
    const ingresos = await this.transaccionesService.findBy({
      userCuentaId: usuarioId,
      tipo: 'INGRESO',
    });
    console.log(ingresos);
    return ingresos;
  }

  async obtenerEgresos(usuarioId: number) {
    const egresos = await this.transaccionesService.findBy({
      userCuentaId: usuarioId,
      tipo: 'EGRESO',
    });
    console.log(egresos);
    return egresos;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaccione`;
  }

  update(id: number, updateTransaccioneDto: UpdateTransaccioneDto) {
    return `This action updates a #${id} transaccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccione`;
  }
}
