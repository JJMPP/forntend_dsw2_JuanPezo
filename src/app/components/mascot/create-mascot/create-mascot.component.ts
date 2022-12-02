import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentService } from 'src/app/services/department.service';
import { MascotService } from 'src/app/services/mascot.service';
import { UsersService } from 'src/app/services/users.service';

declare var iziToast;

@Component({
  selector: 'app-create-mascot',
  templateUrl: './create-mascot.component.html',
  styles: [
  ]
})
export class CreateMascotComponent implements OnInit {

  // form!: FormGroup;

  listUsers: NewUser[] = [];
  listDepartments: Department[] = [];

  public mascot: any = {
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
    private _router: Router
    // private _formBuilder: FormBuilder,
  ) {
    this._authSercive.listUsersOwner().subscribe(res=> this.listUsers = res);
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
  }

  ngOnInit(): void {
  }

  // private buildForm() {
  //   this.form = this._formBuilder.group({
  //     nom_mascota: ['', [Validators.required]],
  //     sexo_mascota: ['', Validators.required],
  //     raza_mascota: ['', [Validators.required]]
  //   });

  //   this.form.valid
  //   this.form.invalid
  // }

  register(registerMascot:any) {
    if (registerMascot.valid) {
      this._mascotService.addMascot(this.mascot).subscribe(
        res=> {
          this.mascot = {
            id: 0,
            name:'',
            sex:'',
            race: '',
            user:{
              id: 0
            },
            deparment:{
              id: 0
            }
          }
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: 'Se registro la mascota correctamente.'
          });          
          this._router.navigate(['/dashboard/mascot']);
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
