import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entidad';
import { Categoria } from '../categorias/categoria.entidad';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductosServicio {
  constructor(
    @InjectRepository(Producto) private readonly repo: Repository<Producto>,
    @InjectRepository(Categoria) private readonly catRepo: Repository<Categoria>,
  ) {}

  async crear(dto: CrearProductoDto, imagenUrl?: string) {
    const producto = this.repo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio: dto.precio,
      imagenUrl,
    });

    if (dto.categoriaId) {
      const categoria = await this.catRepo.findOne({ where: { id: dto.categoriaId } });
      producto.categoria = categoria ?? null;
    }

    return this.repo.save(producto);
  }

  listar() {
    return this.repo.find();
  }

  buscarPorId(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async actualizar(id: string, dto: ActualizarProductoDto, imagenUrl?: string) {
    const producto = await this.repo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    Object.assign(producto, dto);

    if (dto.categoriaId !== undefined) {
      const categoria = await this.catRepo.findOne({ where: { id: dto.categoriaId } });
      producto.categoria = categoria ?? null;
    }

    if (imagenUrl !== undefined) producto.imagenUrl = imagenUrl;

    return this.repo.save(producto);
  }

  async eliminar(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Producto no encontrado');
  }
}
