import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id_producto: number;
  nombre_prod: string;
  precio: number ;
  
}

@Injectable({ providedIn: 'root' })
export class  ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
  getProductoPorId(id:number){
       return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }
     crearProducto(producto: { nom_producto: string; precio: number }): Observable<any> {
  return this.http.post('http://localhost:8080/api/crearProducto', producto);
}
actualizarProducto(id: number, producto: { nom_producto: string; precio: number }) {
  return this.http.put(`http://localhost:8080/api/productos/${id}`, producto);
}
}