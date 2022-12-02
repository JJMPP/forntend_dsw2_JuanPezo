import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast;

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: [
  ]
})
export class UpdateUserComponent implements OnInit {


  // listaRole = [
  //   {
  //     id: 'ROLE_ADMIN',
  //     desc: 'Admin'
  //   },
  //   {
  //     id: 'ROLE_OWNER',
  //     desc: 'Propietario'
  //   },
  //   {
  //     id: 'ROLE_USER',
  //     desc: 'Visitante'
  //   }
  // ];

  // role: string = "";

  newuser: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    dni: '',
    phone: '',
    joinDate: '',
    status: 0,
    // roles: [] = []
  }
  // newuser: User = new User();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) { 
    this.getUser();    
  }

  ngOnInit(): void {    
  }

  getUser(): void{
    this._activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this._authService.getUser(id).subscribe((user) => this.newuser = user);
      }
    })
  }

  update(updateUser:any) {
    if (updateUser.valid) {  
      // this.newuser.roles.push(this.role);
      this._authService.updateUser(this.newuser).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Actualizado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/user']);
          console.log(res);          
        },
        error: err=> {

          if (err.status == 500) {
            iziToast.show({
              title: 'Error',
              position: 'topRight',
              color: 'red',
              timeout: 3000,
              message: 'El correo no tiene un formato correcto'
            }); 
          } else {
            iziToast.show({
              title: 'Error',
              position: 'topRight',
              color: 'red',
              timeout: 3000,
              message: `${err.error.mensaje}`
            });                   
          }     
        }
      });
    }
  }

}
