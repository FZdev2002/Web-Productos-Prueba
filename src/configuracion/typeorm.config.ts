import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producto } from '../models/productos/producto.entidad';
import { Categoria } from '../models/categorias/categoria.entidad';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PUERTO) || 3306,
  username: process.env.DB_USUARIO,
  password: process.env.DB_CLAVE,
  database: process.env.DB_NOMBRE,
  entities: [Producto, Categoria],
  synchronize: true,
  // logging: true,
});
