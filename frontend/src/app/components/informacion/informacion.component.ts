import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent implements OnInit{
  constructor(private dataService: DataService){}

  myArray: any[] = [];

  ngOnInit():void
  {
    this.dataService.getData().subscribe(data => {
      this.myArray = data;
      console.log(this.myArray); // Verificar que los datos se cargaron correctamente
    });
  }

  informacion(deducible:string)
  {
    for(let i=0;i<this.myArray.length;i++)
      {
        if(deducible==this.myArray[i].categoria)
        {
          alert(this.myArray[i].informacionAdicional);
          break;
        }
      } 
     }
  info()
  {
  alert('Esta es información adicional');
  }

  borrarDeducible(deducible: string)
  {
    for(let i=0;i<this.myArray.length;i++)
    {
      if(deducible==this.myArray[i].categoria)
      {
        this.myArray.splice(i,1);
      }
    }
  }
}