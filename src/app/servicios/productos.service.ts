import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private base = `${environment.apiUrl}/productos`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base);
  }

  obtener(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.base}/${id}`);
  }

  crear(p: Producto, archivo?: File): Observable<Producto> {
    const fd = new FormData();
    fd.append('nombre', p.nombre);
    if (p.descripcion) fd.append('descripcion', p.descripcion);
    fd.append('precio', String(p.precio));
    if (p.categoriaId) fd.append('categoriaId', p.categoriaId);
    if (archivo) fd.append('imagen', archivo);
    return this.http.post<Producto>(this.base, fd);
  }

  actualizar(id: string, p: Partial<Producto>, archivo?: File): Observable<Producto> {
    const fd = new FormData();
    if (p.nombre !== undefined) fd.append('nombre', p.nombre);
    if (p.descripcion !== undefined) fd.append('descripcion', p.descripcion ?? '');
    if (p.precio !== undefined) fd.append('precio', String(p.precio));
    if (p.categoriaId !== undefined) fd.append('categoriaId', p.categoriaId ?? '');
    if (archivo) fd.append('imagen', archivo);
    return this.http.patch<Producto>(`${this.base}/${id}`, fd);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
