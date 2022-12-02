import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

declare var iziToast;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: [
  ]
})
export class CreateUserComponent implements OnInit {

  listaRole = [
    {
      id: 'admin',
      desc: 'Admin'
    },
    {
      id: 'owner',
      desc: 'Propietario'
    },
    {
      id: 'counter',
      desc: 'Counter'
    }
  ];

  role: string = "";

  newuser: NewUser = {
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    dni: '',
    phone: '',
    status: 0,
    roles: [] = []
  }

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
  }

  register(registerUser:any) {
    if (registerUser.valid) {  
      this.newuser.roles.push(this.role);
      this._authService.newUser(this.newuser).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/user']);
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
