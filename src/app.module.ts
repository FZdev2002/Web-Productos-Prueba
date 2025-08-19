import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configuracion/typeorm.config';
import { CategoriasModulo } from './models/categorias/categorias.modulo';
import { ProductosModulo } from './models/productos/productos.modulo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }),
    CategoriasModulo,
    ProductosModulo,
  ],
})
export class AppModule {}

