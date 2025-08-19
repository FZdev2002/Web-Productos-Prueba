import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string;
}
