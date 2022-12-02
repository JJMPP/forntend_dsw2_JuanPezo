import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department';
import { Payment } from 'src/app/models/payment';
import { PaymentReceipts } from 'src/app/models/payment-receipts';
import { TypeService } from 'src/app/models/type-service';
import { DepartamentService } from 'src/app/services/department.service';
import { PaymentService } from 'src/app/services/payment.service';

declare var iziToast;

@Component({
  selector: 'app-payment-receipts',
  templateUrl: './payment-receipts.component.html'
})
export class PaymentReceiptsComponent implements OnInit {

  paymentReceipts: PaymentReceipts[] = [];
  listDepartments: Department[] = [];
  listTypeServices: TypeService[] = [];

  paymentReceipt: any = {
    id: 0,
    amount: '',
    month: '',
    period: '',
    registrationDate: '',
    paymentDate: '',
    expirationDate: '',
    status: '',
    userPaymentDate: '',
    typeService: {
      id: '',
      name: ''
    },
    department: {
      id: '',
      name: '',
      user: {
        dni: '',
        name: ''
      },
      tower: {
        id: '',
        name: ''
      }
    }
  }

  dateTime: any

  constructor(
    private _paymentService: PaymentService,
    private _departmentService: DepartamentService,
    private _datePipe: DatePipe
  ) { 
    this._departmentService.listDepartment().subscribe(res=> this.listDepartments = res);
    this._paymentService.listTypeServices().subscribe(res=> this.listTypeServices = res);
    this.listPaymentReceipts();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.dateTime = this._datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss'); //'yyyy-MM-dd HH:mm:ss'
    }, 1000);
  }

  listPaymentReceipts() {
    this._paymentService.listPaymentReceipts().subscribe({
      next: res=> {
        this.paymentReceipts = res;   
        console.log(this.paymentReceipts);
                    
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  consulta() {
    this._paymentService.getListPaymentReceiptParams(this.paymentReceipt.department.user.dni, this.paymentReceipt.department.user.name, 
                                                     this.paymentReceipt.typeService.id, this.paymentReceipt.status)
    .subscribe({
      next: res=> {
        this.paymentReceipts = res.lista;
        console.log(this.paymentReceipts);
        
      }
    });
  }

  searchPayment(item:PaymentReceipts) {
    this.paymentReceipt = item
    console.log(this.paymentReceipt);
  }

  getEstado(status:number):string {
    let salida = "";
    if (status == 2) {
      salida = "Atendido";
    } else {
      salida = "No atendido";
    }
    return salida == null? "": salida;
  }

  getTextoBottonEstado(estado:number):string {
    let salida = "";
    if (estado == 2) {
      salida = "Pagado";
    } else {
      salida = "Pagar";
    }
    return salida == null? "":salida;
  }

  updateProccess() {
    this.paymentReceipt.userPaymentDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this._paymentService.pagar(this.paymentReceipt).subscribe({
      next: res=> {
        iziToast.show({
          title: 'Boleta Pagada',
          position: 'topRight',
          color: '#A4E2B2',
          timeout: 3000,
          message: 'Boleta pagada con éxito'
        });          
        console.log(res);
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  

  reset() {
    this.paymentReceipt = {
      status: '',
      typeService: {
        id: '',
        name: ''
      },
      department: {
        name: '',
        user: {
          dni: '',
          name: ''
        },
        tower: {
          name: ''
        }
      }
    }
    this.listPaymentReceipts();
  }

}
