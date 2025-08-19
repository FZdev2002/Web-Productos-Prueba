import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entidad';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@Injectable()
export class CategoriasServicio {
  constructor(
    @InjectRepository(Categoria) private readonly repo: Repository<Categoria>,
  ) {}

  crear(dto: CrearCategoriaDto) {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  listar() {
    return this.repo.find();
  }

  async eliminar(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Categoría no encontrada');
  }

  buscarPorId(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async actualizar(id: string, dto: ActualizarCategoriaDto) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Categoría no encontrada');

    if (dto.nombre !== undefined) {
      const nombre = dto.nombre.trim();
      if (!nombre) throw new BadRequestException('El nombre no puede estar vacío');
      cat.nombre = nombre;
    }

    try {
      return await this.repo.save(cat);
    } catch (e: any) {
      if (e?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
      throw e;
    }
  }
}
