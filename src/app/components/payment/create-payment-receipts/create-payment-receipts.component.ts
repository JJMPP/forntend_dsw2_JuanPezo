import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { TypeService } from 'src/app/models/type-service';
import { DepartamentService } from 'src/app/services/department.service';
import { PaymentService } from 'src/app/services/payment.service';

declare var iziToast;

@Component({
  selector: 'app-create-payment-receipts',
  templateUrl: './create-payment-receipts.component.html',
  styles: [
  ]
})
export class CreatePaymentReceiptsComponent implements OnInit {

  listDepartments: Department[] = [];

  listTypeServices: TypeService[] = [];

  paymentReceipt: any = {
    id: 0,
    amount: '',
    periodDate: '',
    typeService: {
      id: '',
    },
    department: {
      id: '',
    }
  }

  constructor(
    private _router: Router,
    private _paymentService: PaymentService,
    private _departmentService: DepartamentService,
  ) { 
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
    this._paymentService.listTypeServices().subscribe(res=> this.listTypeServices = res);
  }

  ngOnInit(): void {
  }

  register(registerBoleta:any) {
    if (registerBoleta.valid) {
      this._paymentService.createReceipt(this.paymentReceipt).subscribe({
        next: res=> {
          iziToast.show({
            title: 'Registrado',
            position: 'topRight',
            color: '#A4E2B2',
            timeout: 3000,
            message: `${res.mensaje}`
          });          
          this._router.navigate(['/dashboard/boleta']);
          console.log(res);  
          console.log(res);          
        },
        error: err=> {
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
