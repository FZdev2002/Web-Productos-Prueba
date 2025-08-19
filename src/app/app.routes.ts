import { Routes } from '@angular/router';
import { CategoriasListaComponent } from './paginas/categorias-lista/categorias-lista.component';
import { ProductosListaComponent } from './paginas/productos-lista/productos-lista.component';
import { ProductoFormularioComponent } from './paginas/producto-formulario/producto-formulario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'categorias', component: CategoriasListaComponent },
  { path: 'productos', component: ProductosListaComponent },
  { path: 'productos/nuevo', component: ProductoFormularioComponent },
  { path: 'productos/:id', component: ProductoFormularioComponent }, // editar
];
