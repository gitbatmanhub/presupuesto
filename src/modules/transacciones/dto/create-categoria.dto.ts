import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  nameCategoria: string;
}
