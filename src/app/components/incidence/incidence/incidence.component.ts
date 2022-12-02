import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Incidence } from 'src/app/models/incidence';
import { DepartamentService } from 'src/app/services/department.service';
import { IncidenceService } from 'src/app/services/incidence.service';

declare var iziToast;

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styles: [
  ]
})
export class IncidenceComponent implements OnInit {

  incidences: Incidence[] = [];
  listDepartments: Department[] = [];
  
  incidence: any = {
    id: 0,
    cause: '',
    status: '',
    department: {
      id: '',
      name: ''
    }
  }

  constructor(
    private _router: Router,
    private _incidenceService: IncidenceService,
    private _departmentService: DepartamentService,
  ) { 
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
    this._incidenceService.listIncidence().subscribe({
      next: res=> {
        this.incidences = res;       
        console.log(this.incidences);        
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  ngOnInit(): void {
  }

  consulta() {
    this._incidenceService.getListIncidenceParams(this.incidence.department.id, this.incidence.status, this.incidence.cause)
    .subscribe({
      next: res=> {
        this.incidences = res.lista;
        console.log(this.incidences);
        
      }
    });
  }

  searchIncidence(item:Incidence) {
    this.incidence = item
    console.log(this.incidence);
  }

  getEstado(status:number):string {
    let salida = "";
    if (status == 2) {
      salida = "Atendido";
    } else {
      salida = "No Atendido";
    }
    return salida == null? "": salida;
  }

  updateProccess() {
    this._incidenceService.getUpdateStateIncidence(this.incidence).subscribe({
      next: res=> {
        iziToast.show({
          title: 'Actualizado',
          position: 'topRight',
          color: '#A4E2B2',
          timeout: 3000,
          message: 'Incidencia Actualizado con éxito'
        });          
        console.log(res);
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

}
