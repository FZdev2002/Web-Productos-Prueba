import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../modelos/producto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[] = [];
  cargando = false;
  error?: string;
  base = environment.apiUrl;

  constructor(private api: ProductosService, private router: Router) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando = true; this.error = undefined;
    this.api.listar().subscribe({
      next: (data) => { this.productos = data; this.cargando = false; },
      error: () => { this.error = 'No se pudo cargar productos'; this.cargando = false; }
    });
  }

  nuevo() { this.router.navigate(['/productos/nuevo']); }
  editar(id: string) { this.router.navigate(['/productos', id]); }

  eliminar(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.api.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => this.error = 'No se pudo eliminar',
    });
  }
}
