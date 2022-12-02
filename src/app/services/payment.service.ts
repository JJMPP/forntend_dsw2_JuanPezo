import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { PaymentReceipts } from '../models/payment-receipts';
import { TypeService } from '../models/type-service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listPaymentReceipts():Observable<PaymentReceipts[]>{
    return this._httpClient.get<PaymentReceipts[]>(this.baseURL+"url/paymentReceipt/list");
  }

  listTypeServices():Observable<TypeService[]>{
    return this._httpClient.get<TypeService[]>(this.baseURL+"url/paymentReceipt/listServices");
  }

  createReceipt(reg:PaymentReceipts): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/paymentReceipt/create', reg);
  }

  getListPaymentReceiptParams(dni:string,name:string,typeService:number,status:number): Observable<any> {
    const params = new HttpParams()
      .set("dni", dni)
      .set("name", name)
      .set("typeService", typeService)
      .set("status", status);

    return this._httpClient.get(this.baseURL+"url/paymentReceipt/paymentReceiptByParameters",{params});
  }

  pagar(act:PaymentReceipts): Observable<any> {
    return this._httpClient.put(this.baseURL+"url/paymentReceipt/updatePaymentReceipt",act);
  }
}
