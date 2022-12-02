import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentTypes } from 'src/app/models/department-types';
import { NewUser } from 'src/app/models/new-user';
import { Tower } from 'src/app/models/tower';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentService } from 'src/app/services/department.service';
import { TowerService } from 'src/app/services/tower.service';

declare var iziToast;

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styles: [
  ]
})
export class UpdateDepartmentComponent implements OnInit {

  listTowers: Tower[] = [];
  listDepartmentTypes: DepartmentTypes[] = [];
  listUsers: NewUser[] = [];

  department: any = {
    id: 0,
    name: '',
    number: '',
    floor: '',
    numberRooms: '',
    status: '',
    squareMeters: '',
    joinDate: '',
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
    private _activatedRoute: ActivatedRoute,
    private _departmentService: DepartamentService,
    private _authService: AuthService,
    private _towerService: TowerService,
  ) {    
    this.getDepartment();
    this._towerService.listTowers().subscribe(res=> this.listTowers = res);
    this._authService.listUsersOwner().subscribe(res=> this.listUsers = res);
    this._departmentService.listDepartmentTypes().subscribe(res=> this.listDepartmentTypes = res);
  }

  ngOnInit(): void {
  }

  getDepartment(): void{
    this._activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this._departmentService.getDepartment(id).subscribe(
          (department) => this.department = department          
        );
      }
    })
  }


  update(updateDepartment:any) {
    if (updateDepartment.valid) {
      this._departmentService.updateDepartment(this.department).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Actualizado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/department']);
          console.log(res);  
        },
        error: err=> {
          console.log(err);
          
        }
      })
    }
  }

}
