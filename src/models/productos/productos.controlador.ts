import {
  Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductosServicio } from './productos.servicio';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

const almacenamiento = diskStorage({
  destination: './uploads',
  filename: (_, archivo, cb) => {
    const unico = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unico}${extname(archivo.originalname)}`);
  },
});

@Controller('productos')
export class ProductosControlador {
  constructor(private readonly servicio: ProductosServicio) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', { storage: almacenamiento }))
  crear(@UploadedFile() archivo: Express.Multer.File, @Body() dto: CrearProductoDto) {
    const url = archivo ? `/uploads/${archivo.filename}` : undefined;
    return this.servicio.crear(dto, url);
  }

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.servicio.buscarPorId(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', { storage: almacenamiento }))
  actualizar(
    @Param('id') id: string,
    @UploadedFile() archivo: Express.Multer.File,
    @Body() dto: ActualizarProductoDto,
  ) {
    const url = archivo ? `/uploads/${archivo.filename}` : undefined;
    return this.servicio.actualizar(id, dto, url);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.servicio.eliminar(id);
  }
}
