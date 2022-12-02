import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Visit } from '../models/visit';
import { Visitor } from '../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listVisitor():Observable<Visitor[]>{
    return this._httpClient.get<Visitor[]>(this.baseURL+"url/visita/list");
  }

  listVisit():Observable<Visit[]>{
    return this._httpClient.get<Visit[]>(this.baseURL+"url/visita/listaVisit");
  }

  addVisitor(reg:Visitor): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/visita/create', reg);
  }

  consulta(filtro:string): Observable<Visitor> {
      return this._httpClient.get<Visitor>(this.baseURL+"url/visita/findVisitorByDni/"+filtro);     
  }

  changeStatus(changeStatus:Visit): Observable<any> {
    return this._httpClient.put<any>(this.baseURL + 'url/visita/changeStatus' + `/${changeStatus.id}`,changeStatus);
  }

  addVisit(reg:Visit): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/visita/createVisit', reg);
  }
}
