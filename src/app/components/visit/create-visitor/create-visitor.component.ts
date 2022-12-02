import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { VisitService } from 'src/app/services/visit.service';

declare var iziToast;

@Component({
  selector: 'app-create-visitor',
  templateUrl: './create-visitor.component.html',
  styles: [
  ]
})
export class CreateVisitorComponent implements OnInit {

  users: NewUser[] = [];

  visitor: any = {
    id: 0,
    name:'',
    lastname: '',
    dni: '',
    phone: '',
    exitDate: '',
    status: 0,
    user: {
      id: ''
    }
  };

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _visitService: VisitService
  ) {
    this.getUserByRole();
  }

  ngOnInit(): void {
  }

  getUserByRole() : void {
    this._authService.listUsersOwner().subscribe({
      next: res=> {
        this.users = res;       
        console.log(this.users);        
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  register(registerVisitor:any) {
    if (registerVisitor.valid) {  
      this._visitService.addVisitor(this.visitor).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/visitor']);
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
