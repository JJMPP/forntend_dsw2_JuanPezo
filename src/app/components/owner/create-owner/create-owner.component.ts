import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OwnerService } from 'src/app/services/owner.service';
import { UsersService } from 'src/app/services/users.service';

declare var iziToast;

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styles: [
  ]
})
export class CreateOwnerComponent implements OnInit {

  listUser: User[] = [];

  public owner: any = {
    usuario: {
      id: ''
    }
  }

  constructor(
    private _router: Router,
    private _ownerService: OwnerService,
    private _authSercive: AuthService,
  ) { 
    this._authSercive.listUsers().subscribe(
      res=> this.listUser = res
    );
  }

  ngOnInit(): void {
  }

  register(registerOwner:any) {
    if (registerOwner.valid) {
      this._ownerService.addOwner(this.owner).subscribe(
        res=> {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: 'Se registro el propietario correctamente.'
          });
          console.log(res);          
          this._router.navigate(['/dashboard/owner']);
        }, 
        err=> {
          iziToast.show({
            title: 'Error',
            position: 'topRight',
            color: 'red',
            timeout: 3000,
            message: 'No se registró, consulte con el administrador.'
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
