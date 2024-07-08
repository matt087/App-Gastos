import { Component, OnInit, ViewChild  } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Impuesto } from '../../models/impuesto.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {
  @ViewChild('impuesto') impuesto!: NgForm;
  formData: any = {};
  datos: Impuesto | null = null; // Cambiado a un solo objeto Impuesto en lugar de un arreglo
  sumaIngresos: number = 0;
  baseImponible: number = 0;
  fraccionBasica: number = 0;
  impuestoExcedente: number = 0;
  impuestoBasica: number = 0;
  excedente: number = 0;
  Pexcedente: number = 0;
  renta: number = 0;
  maxi: number=0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    
  }

  enviar() {
    console.log('Formulario enviado');
    this.maxi=this.formData.Salud + this.formData.Vivienda + this.formData.Alimentacion+ this.formData.Vestimenta +this.formData.Educacion;
    if (this.maxi >15238.6){
      alert('Límite de gastos personales superado (15238.60$)');
      this.impuesto.resetForm();
    }else{
      this.dataService.guardarDatosLocalmente(this.formData).subscribe(
        (response) => {
          console.log('Datos guardados correctamente:', response);
          if (this.impuesto) {
            this.impuesto.resetForm();
          }
        },
        (error) => {
          console.error('Error al guardar los datos:', error);
        }
      );
      this.obtenerDatos();
    }
   
  }

  obtenerDatos() {
    this.dataService.obtenerDatos().subscribe(
      (response) => {
        console.log('Respuesta de obtenerDatos:', response);
        // Verifica que response sea un objeto válido de Impuesto
        if (response && typeof response === 'object') {
          this.datos = response; //  datos del Impuesto recibido
          this.calcularSumaIngresos(); // suma de ingresos
          this.calcularBaseImponible();
          this.seleccionFraccionBasica();
          this.calcularExcedente();
          this.calcularPExcedente();
          this.calcularImpRenta();
          this.dataService.guardarImpuestosLocalmente({cedula: this.datos.Cedula,
            sumaIngresos: this.sumaIngresos,
            baseImponible: this.baseImponible,
            excedente: this.excedente,
            Pexcedente: this.Pexcedente,
            renta: this.renta
          }).subscribe(
            (response) => {
              console.log('Datos guardados correctamente:', response);
            },
            (error) => {
              console.error('Error al guardar los datos:', error);
            }
          )
        } else {
          console.error('La respuesta de obtenerDatos no es un objeto válido:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  calcularSumaIngresos() {
    if (this.datos) {
      this.sumaIngresos = this.datos.Vivienda + this.datos.Salud + this.datos.Alimentacion + this.datos.Educacion + this.datos.Vestimenta;
    }
  }

  calcularBaseImponible() {
    if(this.datos){
      this.baseImponible = this.datos.Ingreso - this.sumaIngresos;
    }
  }

  seleccionFraccionBasica(){
    if(this.datos){
      console.log(this.datos.Ingreso);
      if(this.baseImponible < 11722){
        this.fraccionBasica=0;
        this.impuestoExcedente=0;
        this .impuestoBasica=0;
      }else if(this.baseImponible >= 11722 && this.baseImponible< 14930){
        this.fraccionBasica=11722;
        this.impuestoExcedente=0.05;
        this .impuestoBasica=0;
      }else if(this.baseImponible >= 14930 && this.baseImponible < 19385){
        this.fraccionBasica=14930;
        this.impuestoExcedente=0.10;
        this .impuestoBasica=160;
      }else if(this.baseImponible >= 19385 && this.baseImponible < 25638){
        this.fraccionBasica=19385;
        this.impuestoExcedente=0.12;
        this .impuestoBasica=606;
      }else if(this.baseImponible >= 25638 && this.baseImponible < 33738){
        this.fraccionBasica=25638;
        this.impuestoExcedente=0.15;
        this .impuestoBasica=1356;
      }else if(this.baseImponible >= 33738 && this.baseImponible < 44721){
        this.fraccionBasica=33738;
        this.impuestoExcedente=0.20;
        this .impuestoBasica=2571;
      }else if(this.baseImponible >= 44721 && this.baseImponible < 59537){
        this.fraccionBasica=44721;
        this.impuestoExcedente=0.25;
        this .impuestoBasica=4768;
      }else if(this.baseImponible >= 59537 && this.baseImponible < 79388){
        this.fraccionBasica=59537;
        this.impuestoExcedente=0.30;
        this .impuestoBasica=8472;
      }else if(this.baseImponible >= 79388 && this.baseImponible < 105580){
        this.fraccionBasica=79388;
        this.impuestoExcedente=0.35;
        this .impuestoBasica=14427;
      }else if(this.baseImponible >= 105580){
        this.fraccionBasica=105580;
        this.impuestoExcedente=0.37;
        this .impuestoBasica=23594;
      }
    }
  }

  calcularExcedente(){
    if(this.datos){
      this.excedente = this.baseImponible - this.fraccionBasica;
    }
  }

  calcularPExcedente(){
    if(this.datos){
      this.Pexcedente = this.excedente * this.impuestoExcedente;
    }
  }

  calcularImpRenta(){
    if(this.datos){    
        this.renta = this.impuestoBasica + this.Pexcedente;
      
    }
  }
}
