import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../modelos/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private base = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.base);
  }

  crear(nombre: string): Observable<Categoria> {
    return this.http.post<Categoria>(this.base, { nombre });
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  actualizar(id: string, nombre: string) {
  return this.http.patch<Categoria>(`${this.base}/${id}`, { nombre });
}


}
