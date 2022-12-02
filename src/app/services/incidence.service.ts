import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Incidence } from '../models/incidence';

@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listIncidence():Observable<Incidence[]>{
    return this._httpClient.get<Incidence[]>(this.baseURL+"url/incidence/list");
  }

  createIncidence(reg:Incidence): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/incidence/create', reg);
  }

  getUpdateStateIncidence(order:Incidence): Observable<Incidence> {
    return this._httpClient.patch<Incidence>(this.baseURL+"url/incidence/updateStateIncidence",order);
  }

  getListIncidenceParams(depa:number,status:number,cause:string): Observable<any> {
    const params = new HttpParams()
      .set("depa", depa)
      .set("cause", cause)
      .set("status", status);

    return this._httpClient.get(this.baseURL+"url/incidence/incidenceByParameters",{params});
  }
}
