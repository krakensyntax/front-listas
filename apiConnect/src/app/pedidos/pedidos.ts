import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService, Pedido } from '../services/pedidos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pedidos.html'
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  cargando = true;
  idBusqueda: number |null=null;
  pedidoEncontrado?: Pedido;
  error = '';

  constructor(private pedidosService: PedidosService) {}
    ngOnInit(): void {
      this.cargarTodos();
      }
  cargarTodos(){
    this.pedidosService.getPedidos().subscribe({
          next: (pedidos) => {
            this.pedidos = pedidos;
            this.cargando = false;
          },
          error: (err) => {
            console.error(err);
            this.error = 'No se pudieron cargar los pedidos';
            this.cargando = false;
          }
        });
    }
    buscarPorId(){
    if (this.idBusqueda == null) return;

    this.pedidosService.getPedidoPorId(this.idBusqueda).subscribe({
      next: (pedido) => {
        this.pedidoEncontrado = pedido;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.pedidoEncontrado = undefined;
        this.error = `No se encontró el cliente con ID ${this.idBusqueda}`;
      }
    });
  }
   nuevoPedido = {

    nom_pedido: '',
    num_pedido: 0
  
};
crear() {
 
  this.pedidosService.crearPedido(this.nuevoPedido).subscribe({
    next: (resp) => {
      console.log('Pedido creado', resp);
    },
    error: (err) => {
      console.error('Error creando pedido', err);
    }
  });
}
pedidoEdit = {
  nom_pedido: '',
  num_pedido: 0
};
idEdit!: number;
editarPedido() {
  this.pedidosService.actualizarPedido(this.idEdit, this.pedidoEdit).subscribe({
    next: (resp) => {
      console.log('Pedido actualizado', resp);
    },
    error: (err) => {
      console.error('Error actualizando pedido', err);
    }
  });
}
 
}