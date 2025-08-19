import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, NonNullableFormBuilder
} from '@angular/forms';
import { CategoriasService } from '../../servicios/categorias.service';
import { Categoria } from '../../modelos/categoria';

@Component({
  selector: 'app-categorias-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.scss'],
})
export class CategoriasListaComponent implements OnInit {
  categorias: Categoria[] = [];
  cargando = false;
  guardando = false;
  error?: string;
  ok?: string;

  formulario!: FormGroup;
  editandoId?: string;
  editControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(80)]
  });

  constructor(private fb: NonNullableFormBuilder, private api: CategoriasService) {
    this.formulario = this.fb.group({
      nombre: this.fb.control('', [Validators.required, Validators.maxLength(80)]),
    });
  }

  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando = true; this.error = undefined;
    this.api.listar().subscribe({
      next: (data) => { this.categorias = data; this.cargando = false; },
      error: () => { this.error = 'No se pudo cargar categorías'; this.cargando = false; }
    });
  }

  crear() {
    this.ok = undefined; this.error = undefined;
    if (this.formulario.invalid) {
      this.error = 'Completa el nombre (máx. 80 caracteres)';
      this.formulario.markAllAsTouched();
      return;
    }
    const nombre = this.formulario.value.nombre!.trim();
    this.api.crear(nombre).subscribe({
      next: () => { this.ok = 'Categoría creada'; this.formulario.reset(); this.cargar(); },
      error: (e) => this.error = e?.error?.message || 'No se pudo crear la categoría',
    });
  }

  iniciarEdicion(cat: Categoria) {
    this.ok = undefined; this.error = undefined;
    this.editandoId = cat.id;
    this.editControl.setValue(cat.nombre);
  }

  cancelarEdicion() {
    this.editandoId = undefined;
    this.editControl.reset('');
  }

  guardarEdicion(id: string) {
    this.ok = undefined; this.error = undefined;
    if (this.editControl.invalid) {
      this.error = 'El nombre es requerido (máx. 80 caracteres)';
      this.editControl.markAsTouched();
      return;
    }
    const nombre = this.editControl.value.trim();
    if (!nombre) { this.error = 'El nombre no puede estar vacío'; return; }

    this.guardando = true;
    this.api.actualizar(id, nombre).subscribe({
      next: () => { this.ok = 'Categoría actualizada'; this.guardando = false; this.cancelarEdicion(); this.cargar(); },
      error: (e) => { this.error = e?.error?.message || 'No se pudo actualizar'; this.guardando = false; }
    });
  }

  eliminar(id: string) {
    this.ok = undefined; this.error = undefined;
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.api.eliminar(id).subscribe({
      next: () => { this.ok = 'Categoría eliminada'; this.cargar(); },
      error: (e) => this.error = e?.error?.message || 'No se pudo eliminar',
    });
  }
}
