import { Component, OnInit } from '@angular/core';
import { Mascot } from 'src/app/models/mascot';
import { MascotService } from 'src/app/services/mascot.service';

declare var iziToast;

@Component({
  selector: 'app-mascot',
  templateUrl: './mascot.component.html'
})
export class MascotComponent implements OnInit {

  pets:Mascot[]=[];
  pet: Mascot;

  constructor(
    private _mascotService: MascotService
  ) { }

  ngOnInit(): void {
    this._mascotService.listMascot().subscribe({
      next: res=> {
        this.pets = res;        
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  getEstado(status:number):string {
    let salida = "";
    if (status == 1) {
      salida = "Eliminado";
    } else {
      salida = "Activo";
    }
    return salida == null? "": salida;
  }

  deleteMascot(item:Mascot) {
    this.pet = item;
    this.pet.status = item.status==1?0:1;

    this._mascotService.deleteMascot(this.pet).subscribe({
      next: res=> {
        iziToast.show({
          title: 'Eliminado',
          position: 'topRight',
          color: 'red',
          timeout: 3000,
          message: `${res.mensaje}`
        });
        console.log(res);  
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

}
