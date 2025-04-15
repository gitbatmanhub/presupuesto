import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './user/dto/loginUsuario.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { hashPassword } from './user/config/bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('ingresar')
  async ingresar(@Body() loginUsuarioDto: LoginUsuarioDto) {
    const { email, password } = loginUsuarioDto;

    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const comparePassword = await this.userService.comparePassword(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokenPayload = { username: email, sub: user.idUser };
    const token = await this.jwtService.signAsync(tokenPayload);

    return {
      statusCode: HttpStatus.OK,
      token,
      dataUser: user,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registrarse')
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userService.existeUser(email);
    if (user) {
      throw new UnauthorizedException('Usuario ya registrado');
    }

    createUserDto.password = await hashPassword(password);

    const USER = await this.userService.create(createUserDto);
    const tokenPayload = { username: email, sub: USER.idUser };
    const token = await this.jwtService.signAsync(tokenPayload);
    return {
      statusCode: HttpStatus.OK,
      token,
      dataUser: USER,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
