import { Injectable } from '@nestjs/common';
import { CuentaEntity } from './entities/cuenta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoCuentaDto } from './dto/createTipoCuenta.dto';
import { TipoCuentaEntity } from './entities/tipoCuenta.entity';
import { CuentaUserEntity } from './entities/cuentaUser.entity';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { LinkCuentaToUsuarioDto } from '../auth/user/dto/linkCuentaToUsuario.dto';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(CuentaEntity)
    private readonly cuentaRepository: Repository<CuentaEntity>,
    @InjectRepository(TipoCuentaEntity)
    private readonly tipoCuentaRepository: Repository<TipoCuentaEntity>,
    @InjectRepository(CuentaUserEntity)
    private readonly cuentaUserRepository: Repository<CuentaUserEntity>,
  ) {}

  createCuentaUser(createCuentaDto: CreateCuentaDto) {
    const user = this.cuentaRepository.save(createCuentaDto);
    return user;
  }

  findAllCuentas(): Promise<CuentaEntity[]> {
    return this.cuentaRepository.find();
  }

  findAllTiposCuentas(): Promise<TipoCuentaEntity[]> {
    return this.tipoCuentaRepository.find();
  }

  async findTipoCuentaByNombre(nombre: string) {
    return await this.tipoCuentaRepository.findOneBy({
      nombreTipoCuenta: nombre,
    });
  }

  linkCuentaToUsuario(linkCuentaToUsuarioDto: LinkCuentaToUsuarioDto) {
    const { cuentaIdCuentaId, userIdIdUser } = linkCuentaToUsuarioDto;
    const linkCuentaToUsuario = new CuentaUserEntity();
    linkCuentaToUsuario.cuentaId = cuentaIdCuentaId;
    linkCuentaToUsuario.cuentaUserId = userIdIdUser;
    return this.cuentaUserRepository.create(linkCuentaToUsuario);
  }

  async findCuentasUsuariosByIdUsuario(idUsuario: number) {
    const cuenta = await this.cuentaUserRepository.findBy({
      userId: idUsuario,
    });
    return cuenta;
  }

  createTipoCuenta(createTipoCuentaDto: CreateTipoCuentaDto) {
    return this.tipoCuentaRepository.save(createTipoCuentaDto);
  }
}
