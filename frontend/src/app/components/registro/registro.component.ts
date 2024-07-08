import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user = {
    nombre: '', 
    cedula: '', 
    email: '', 
    password: '', 
    ingreso: 0.0, 
    egreso: 0.0
  }
  singUp(){
    this.authService.singUp(this.user)
    .subscribe(
      res => {
        console.log(res)
        //localStorage.setItem('token', res.token);
        alert('Usuario registrado');
        this.router.navigate(['/tasks'])
      },
      err => console.log(err)
    )
  }
  constructor(private authService:AuthService,
    private router:Router
  ){}
}
