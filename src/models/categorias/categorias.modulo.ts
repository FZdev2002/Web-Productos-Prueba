import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entidad';
import { CategoriasServicio } from './categorias.servicio';
import { CategoriasControlador } from './categorias.controlador';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriasServicio],
  controllers: [CategoriasControlador],
  exports: [CategoriasServicio, TypeOrmModule],
})
export class CategoriasModulo {}
