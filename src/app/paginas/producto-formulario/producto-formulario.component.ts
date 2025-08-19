import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { Categoria } from '../../modelos/categoria';
import { environment } from '../../../environments/environment';
import { Producto } from '../../modelos/producto';

type FormProducto = FormGroup<{
  nombre: FormControl<string>;
  descripcion: FormControl<string>;
  precio: FormControl<number>;
  categoriaId: FormControl<string | null>;
}>;

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './producto-formulario.component.html',
  styleUrls: ['./producto-formulario.component.scss']
})
export class ProductoFormularioComponent implements OnInit {
  formulario!: FormProducto;
  categorias: Categoria[] = [];
  id?: string | null;
  cargando = false;
  error?: string;
  ok?: string;

  archivo?: File;
  preview?: string;
  base = environment.apiUrl;

  constructor(
    private fb: NonNullableFormBuilder,
    private productosApi: ProductosService,
    private categoriasApi: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formulario = this.fb.group({
      nombre: this.fb.control('', [Validators.required, Validators.maxLength(120)]),
      descripcion: this.fb.control('', []),
      precio: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
      categoriaId: this.fb.control<string | null>(null),
    });
  }

  ngOnInit(): void {
    this.categoriasApi.listar().subscribe({
      next: (cats) => this.categorias = cats,
      error: () => this.error = 'No se pudieron cargar las categorías'
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.cargando = true;
      this.productosApi.obtener(this.id).subscribe({
        next: (p) => {
          this.formulario.patchValue({
            nombre: p.nombre,
            descripcion: p.descripcion ?? '',
            precio: p.precio,
            categoriaId: p.categoria?.id ?? null,
          });
          this.preview = p.imagenUrl ? this.base + p.imagenUrl : undefined;
          this.cargando = false;
        },
        error: () => { this.error = 'No se pudo cargar el producto'; this.cargando = false; }
      });
    }
  }

  onArchivo(e: Event) {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    this.archivo = f;
    this.preview = URL.createObjectURL(f);
  }

  guardar() {
    this.error = undefined; this.ok = undefined;

    if (this.formulario.invalid) {
      this.error = 'Revisa los campos obligatorios';
      this.formulario.markAllAsTouched();
      return;
    }

    const datos: Producto = {
      nombre: this.formulario.value.nombre!,
      descripcion: this.formulario.value.descripcion || '',
      precio: Number(this.formulario.value.precio),
      categoriaId: this.formulario.value.categoriaId || undefined,
    };

    if (this.id) {
      this.productosApi.actualizar(this.id, datos, this.archivo).subscribe({
        next: () => { this.ok = 'Producto actualizado'; this.volver(); },
        error: () => this.error = 'No se pudo actualizar',
      });
    } else {
      this.productosApi.crear(datos, this.archivo).subscribe({
        next: () => { this.ok = 'Producto creado'; this.volver(); },
        error: () => this.error = 'No se pudo crear',
      });
    }
  }

  volver() { this.router.navigate(['/productos']); }
}
