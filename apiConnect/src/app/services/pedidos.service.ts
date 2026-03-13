import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id_pedido: number;
  num_pedido: number;
  nom_pedido: string;
  
}

@Injectable({ providedIn: 'root' })
export class  PedidosService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
  getPedidoPorId(id:number){
     return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
  crearPedido(pedido: { nom_pedido: string; num_pedido: number }): Observable<any> {
  return this.http.post('http://localhost:8080/api/crearPedido', pedido);
}
actualizarPedido(id: number, pedido: { nom_pedido: string; num_pedido: number }) {
  return this.http.put(`http://localhost:8080/api/pedidos/${id}`, pedido);
}


}