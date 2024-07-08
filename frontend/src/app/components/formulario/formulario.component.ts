import { Component, OnInit, ViewChild } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  @ViewChild('gasto') gasto!: NgForm;
  formData: any = {};
  datos: Gasto | null = null; 
  id:number = 0;
  constructor(private gastoService: GastoService) { }
  ngOnInit():void {
    this.obtenerDatos();
  }
  enviar() {
    console.log('Formulario enviado');
    this.gastoService.agregarDatos({ id: this.id, ...this.formData }).subscribe(
      (response) => {
        console.log('Datos guardados correctamente:', response);
        if (this.gasto) {
          this.gasto.resetForm();
        }
        alert('Gasto registrado con éxito.');
        this.obtenerDatos();
        
      },
      (error) => {
        console.error('Error al guardar los datos:', error);
      }
    );
    
  }

  obtenerDatos() {
    this.gastoService.obtenerGastos().subscribe(
      (response) => {
        console.log('Respuesta de obtenerDatos:', response);
        // Verifica que response sea un objeto válido de Impuesto
        if (response && typeof response === 'object') {
          this.datos = response; //  datos del Impuesto recibido
          const cantidadResultados = response.length;
          this.id = cantidadResultados+1;
        } else {
          console.error('La respuesta de obtenerDatos no es un objeto válido:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}

  