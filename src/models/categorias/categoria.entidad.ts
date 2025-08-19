import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Producto } from '../productos/producto.entidad';

@Entity('categorias')
@Unique(['nombre'])
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80 })
  nombre: string;

  @OneToMany(() => Producto, (p) => p.categoria)
  productos: Producto[];
}
