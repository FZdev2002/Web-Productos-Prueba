import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../categorias/categoria.entidad';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  precio: number;

  @Column({ nullable: true })
  imagenUrl?: string;

  @ManyToOne(() => Categoria, (c) => c.productos, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  categoria?: Categoria | null;
}
