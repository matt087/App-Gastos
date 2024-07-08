import { Component } from '@angular/core';
import { Gasto } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service';
import { User } from '../../models/user.model'; 
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  gastos:Gasto[]=[];
  usuarios:User[]=[];
  
  constructor(private gastoService:GastoService, private usersService:UserService) {}

  ngOnInit(): void {
    this.gastoService.obtenerGastos ().subscribe(data =>{
      console.log(data);
      this.gastos=data;
    });

    this.usersService.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.usuarios=data;
    });
  }
}

