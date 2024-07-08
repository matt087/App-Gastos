import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  obtenerDatos(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}
