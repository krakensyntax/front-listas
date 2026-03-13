import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../services/clientes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './clientes.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteEncontrado?: Cliente;
  cargando = true;
  error = '';
  idBusqueda: number | null=null;
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
   this.cargarTodos();
  }
 
  cargarTodos(){
 this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.cargando = false;
      }
    });
}
  buscarPorId(){
    if (this.idBusqueda == null) return;

    this.clientesService.getClienteById(this.idBusqueda).subscribe({
      next: (cliente) => {
        this.clienteEncontrado = cliente;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.clienteEncontrado = undefined;
        this.error = `No se encontró el cliente con ID ${this.idBusqueda}`;
      }
    });
  }
  nuevoCliente = {
  nombre: '',
  apellidos: ''
};
crear() {
  this.clientesService.crearCliente(this.nuevoCliente).subscribe({
    next: (resp) => {
      console.log('Cliente creado', resp);
    },
    error: (err) => {
      console.error('Error creando cliente', err);
    }
  });
}
idEdit!: number;

clienteEdit = {
  nombre: '',
  apellidos: ''
};

editarCliente() {
  this.clientesService.actualizarCliente(this.idEdit, this.clienteEdit).subscribe({
    next: (resp) => {
      console.log('Cliente actualizado', resp);
    },
    error: (err) => {
      console.error('Error actualizando cliente', err);
    }
  });
}


}