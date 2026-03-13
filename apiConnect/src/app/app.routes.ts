import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes';
import { PedidosComponent } from './pedidos/pedidos';
import { ProductosComponent } from './productos/productos';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];