import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../services/productos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  productoEncontrado?: Producto;
  idBusqueda: number | null = null;
  cargando = true;
  error = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarTodos();
  }
  cargarTodos(){
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los prodcutos';
        this.cargando = false;
      }
    });
  }
  buscarPorId(){
    if (this.idBusqueda == null) return;

    this.productosService.getProductoPorId(this.idBusqueda).subscribe({
      next: (producto) => {
        this.productoEncontrado = producto;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.productoEncontrado = undefined;
        this.error = `No se encontró el cliente con ID ${this.idBusqueda}`;
      }
    });
  }
   nuevoProducto = {
  nom_producto: '',
  precio: 0
};
crear() {
  this.productosService.crearProducto(this.nuevoProducto).subscribe({
    next: (resp) => {
      console.log('Producto creado', resp);
    },
    error: (err) => {
      console.error('Error creando producto', err);
    }
  });
}
idEdit!: number;

productoEdit = {
  nom_producto: '',
  precio: 0
}
editarProducto() {
  this.productosService.actualizarProducto(this.idEdit, this.productoEdit).subscribe({
    next: (resp) => {
      console.log('Producto actualizado', resp);
    },
    error: (err) => {
      console.error('Error actualizando producto', err);
    }
  });
}
}