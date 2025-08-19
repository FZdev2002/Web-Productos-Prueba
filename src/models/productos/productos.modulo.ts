import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entidad';
import { ProductosServicio } from './productos.servicio';
import { ProductosControlador } from './productos.controlador';
import { Categoria } from '../categorias/categoria.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria])],
  providers: [ProductosServicio],
  controllers: [ProductosControlador],
})
export class ProductosModulo {}
