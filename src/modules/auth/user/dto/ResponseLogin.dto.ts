import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export class ResponseLoginDto {
  @IsNotEmpty()
  statusCode: HttpStatus;

  @IsString()
  token: string;

  @IsOptional()
  dataUser: UserEntity;
}
