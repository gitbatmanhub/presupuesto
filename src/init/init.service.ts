import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CuentaService } from '../modules/cuenta/cuenta.service';
import { TransaccionesService } from '../modules/transacciones/transacciones.service';

@Injectable()
export class InitService implements OnApplicationBootstrap {
  constructor(
    readonly cuentaService: CuentaService,
    readonly transaccionesService: TransaccionesService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedCategorias();
    await this.seedCuentaEfectivo();
  }

  private async seedCategorias() {
    const categoriasBase = ['Comida', 'Transporte', 'Educación'];

    for (const nombre of categoriasBase) {
      const categoria =
        await this.transaccionesService.findCategoriaByName(nombre);
      console.log(categoria);
      if (!categoria) {
        await this.transaccionesService.createCategoriaTransaccion({
          nameCategoria: nombre,
        });
      }
    }
  }

  private async seedCuentaEfectivo() {
    const cuenta = await this.cuentaService.findTipoCuentaByNombre('Efectivo');
    console.log(`Cuenta: ${cuenta}`);
    if (!cuenta) {
      await this.cuentaService.createTipoCuenta({
        nombreTipoCuenta: 'Efectivo',
      });
    }
  }
}
