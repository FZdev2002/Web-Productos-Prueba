import { Body, Controller, Delete, Patch, Get, Param, Post } from '@nestjs/common';
import { CategoriasServicio } from './categorias.servicio';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@Controller('categorias')
export class CategoriasControlador {
  constructor(private readonly servicio: CategoriasServicio) {}

  @Post()
  crear(@Body() dto: CrearCategoriaDto) {
    return this.servicio.crear(dto);
  }

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.servicio.eliminar(id);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarCategoriaDto) {
    return this.servicio.actualizar(id, dto);
  }
}
