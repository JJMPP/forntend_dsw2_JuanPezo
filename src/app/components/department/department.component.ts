import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department';
import { DepartamentService } from 'src/app/services/department.service';

declare var iziToast;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {

  listDepartments: Department[] = [];
  department: Department;

  constructor(
    private _departmentService: DepartamentService
  ) { }

  ngOnInit(): void {
    this._departmentService.listDepartment().subscribe({
      next: res=> {
        this.listDepartments = res;        
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

  deleteDepartment(item:Department) {
    this.department = item;
    this.department.status = item.status==1?0:1;

    this._departmentService.deleteDepartment(this.department).subscribe({
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
