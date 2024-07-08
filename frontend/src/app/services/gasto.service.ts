import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private apiUrl = 'http://localhost:3000'; //servidor simulado

  constructor(private http: HttpClient) {}

  agregarDatos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar-datos`, data);
  }

  obtenerGastos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-gastos`);
  }
  private apiUrl1 = 'https://jsonplaceholder.typicode.com/users';   

  obtenerUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl1);
  }
}
