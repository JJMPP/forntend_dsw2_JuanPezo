import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentTypes } from 'src/app/models/department-types';
import { NewUser } from 'src/app/models/new-user';
import { Tower } from 'src/app/models/tower';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentService } from 'src/app/services/department.service';
import { TowerService } from 'src/app/services/tower.service';

declare var iziToast;

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styles: [
  ]
})
export class CreateDepartmentComponent implements OnInit {

  listTowers: Tower[] = [];
  listDepartmentTypes: DepartmentTypes[] = [];
  listUsers: NewUser[] = [];

  department: any = {
    id: 0,
    name: '',
    number: '',
    floor: '',
    numberRooms: '',
    squareMeters: '',
    tower: {
      id: ''
    },
    departmentTypes: {
      id: ''
    },
    user: {
      id: ''
    }
  }

  constructor(
    private _router: Router,
    private _departmentService: DepartamentService,
    private _authService: AuthService,
    private _towerService: TowerService,
  ) { 
    this._towerService.listTowers().subscribe(res=> this.listTowers = res);
    this._authService.listUsersOwner().subscribe(res=> this.listUsers = res);
    this._departmentService.listDepartmentTypes().subscribe(res=> this.listDepartmentTypes = res);
  }

  ngOnInit(): void {
  }

  register(registerMascot:any) {
    if (registerMascot.valid) {
      this._departmentService.addDepartment(this.department).subscribe(
        res=> {
          this.department = {
            id: 0,
            name: "",
            number: 0,
            floor: 0,
            numberRooms: 0,
            squareMeters: 0,
            tower: {
              id: 0
            },
            departmentTypes: {
              id: 0
            },
            user: {
              id: 0
            }
          }
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: 'Se registro el departamento correctamente.'
          });          
          this._router.navigate(['/dashboard/department']);
        },
        err=> {
          iziToast.show({
            title: 'Error',
            position: 'topRight',
            color: 'red',
            timeout: 3000,
            message: `${err.error.mensaje}`
          });
          console.log(err);          
        }
      );      
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
