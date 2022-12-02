import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Incidence } from 'src/app/models/incidence';
import { DepartamentService } from 'src/app/services/department.service';
import { IncidenceService } from 'src/app/services/incidence.service';

declare var iziToast;

@Component({
  selector: 'app-create-incidence',
  templateUrl: './create-incidence.component.html',
  styles: [
  ]
})
export class CreateIncidenceComponent implements OnInit {

  listDepartments: Department[] = [];

  incidences: Incidence[] = [];
  incidence: any = {
    id: '',
    cause: '',
    comment: '',
    status: '',
    registrationDate: '',
    incidenceDate: '',
    department: {
      id: ''
    }
  }

  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _departmentService: DepartamentService,
    private _incidenceService: IncidenceService
  ) { 
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
  }

  ngOnInit(): void {
  }

  register(registerIncidence:any) {
    if (registerIncidence.valid) {
      this.incidence.incidenceDate = this._datePipe.transform(this.incidence.incidenceDate, 'yyyy-MM-dd HH:mm:ss');
      this._incidenceService.createIncidence(this.incidence).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/incidence']);
          console.log(res);  
        },
        error: err=> {
          iziToast.show({
            title: 'Error',
            position: 'topRight',
            color: 'red',
            timeout: 3000,
            message: `${err.error.mensaje}`
          });  
          console.log(err);          
        }
      });
    } else {
      iziToast.show({
        title: 'Error',
        position: 'topRight',
        color: 'red',
        timeout: 3000,
        message: 'Complete todos los datos del formulario.'
      });
    }
  }

}
