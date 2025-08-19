import { Categoria } from './categoria';
export interface Producto {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string | null;
  categoria?: Categoria | null;
  categoriaId?: string;
}
