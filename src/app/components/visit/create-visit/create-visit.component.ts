import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Visit } from 'src/app/models/visit';
import { Visitor } from 'src/app/models/visitor';
import { DepartamentService } from 'src/app/services/department.service';
import { VisitService } from 'src/app/services/visit.service';

declare var iziToast;

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styles: [
  ]
})
export class CreateVisitComponent implements OnInit {

  dateTime: any

  listDepartments: Department[] = [];

  visitors: Visitor[] = [];
  visitor: any = {
    id: 0,
    name: '',
    lastname: '',
    dni: '',
    phone: '',
    user: {
      id: ''
    }
  }

  visits: Visit[] = [];
  visit: any = {
    id: 0,
    comments: '',
    entryDate: '',
    estimatedDate: '',
    exitDate: '',
    status: 0,    
    department: {
      id: ''
    },
    visitor: {
      id: ''      
    }    
  }

  filtro: string ="";
  visitorId : string = "";
  

  constructor(
    private _router: Router,
    private _visitService: VisitService,
    private _departmentService: DepartamentService,
    private _datePipe: DatePipe
  ) {
    this._visitService.listVisitor().subscribe({
      next: res=> {
        this.visitors = res;
      },
      error: err=> {
        console.log(err);        
      }
    });
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.dateTime = this._datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss'); //'yyyy-MM-dd HH:mm:ss'
    }, 1000);          
  }

  consulta() {
    this._visitService.consulta(this.filtro).subscribe(
      res=> {
        this.visitor = res[0];
        console.log(this.visitor);   
      }
    );
  }

  register(registerVisit:any) {
    if (registerVisit.valid) {
      this.visit.entryDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.visit.estimatedDate = this._datePipe.transform(this.visit.estimatedDate, 'yyyy-MM-dd HH:mm:ss');
      this.visit.visitor.id = this.visitor.id;
      this._visitService.addVisit(this.visit).subscribe({
        next: res => {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            message: `${res.mensaje}`
          });          
          // this._router.navigate(['/dashboard/visit']);
          console.log(res);              
        },
        error: err => {
          iziToast.show({
            title: 'Error',
            position: 'topRight',
            color: 'red',
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
