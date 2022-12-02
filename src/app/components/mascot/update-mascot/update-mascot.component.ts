import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentService } from 'src/app/services/department.service';
import { MascotService } from 'src/app/services/mascot.service';

declare var iziToast;

@Component({
  selector: 'app-update-mascot',
  templateUrl: './update-mascot.component.html',
  styles: [
  ]
})
export class UpdateMascotComponent implements OnInit {

  listUsers: NewUser[] = [];
  listDepartments: Department[] = [];

  mascot: any = {
    id: 0,
    name:'',
    sex:'',
    race: '',
    user:{
      id: ''
    },
    department:{
      id: ''
    }
  };

  constructor(
    private _mascotService: MascotService,
    private _authSercive: AuthService,
    private _departmentService: DepartamentService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { 
    this.getMascot();
    this._authSercive.listUsersOwner().subscribe(res=> this.listUsers = res);
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
  }

  ngOnInit(): void {
  }

  getMascot(): void{
    this._activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this._mascotService.getMascot(id).subscribe(
          (mascot) => this.mascot = mascot        
        );
      }
    })
  }

  update(updateMascot:any) {
    if (updateMascot.valid) {
      this._mascotService.updateMascot(this.mascot).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Actualizado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/mascot']);
          console.log(res);  
        },
        error: err=> {
          console.log(err);
          
        }
      })
    }
  }

}
