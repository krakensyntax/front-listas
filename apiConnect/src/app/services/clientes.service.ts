import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  apellidos: string;
}

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

 getClienteById(id: number) {
  return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
}
crearCliente(cliente: { nombre: string; apellidos: string }): Observable<any> {
  return this.http.post('http://localhost:8080/api/crearCliente', cliente);
}
actualizarCliente(id: number, cliente: { nombre: string; apellidos: string }) {
  return this.http.put(`http://localhost:8080/api/clientes/${id}`, cliente);
}


}