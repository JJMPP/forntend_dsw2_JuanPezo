import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  users: User[] = [];
  user: User;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.listUsers().subscribe({
      next: res=> {
        this.users = res;       
        console.log(this.users);
        
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

  // busca(item:User) {
  //   this.user = item
  //   console.log(this.user);
  // }

  deleteUser(item:User) {
    this.user = item;
    this.user.status = item.status==1?0:1;

    this._authService.deleteUser(this.user).subscribe({
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
