import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department';
import { DepartmentTypes } from '../models/department-types';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listDepartment():Observable<Department[]>{
    return this._httpClient.get<Department[]>(this.baseURL+"url/departamento/list");
  }

  listDepartmentTypes():Observable<DepartmentTypes[]>{
    return this._httpClient.get<DepartmentTypes[]>(this.baseURL+"url/departamento/listdepartmenttypes");
  }

  addDepartment(reg:Department): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/departamento/create', reg);
  }

  getDepartment(id): Observable<Department>{
    return this._httpClient.get<Department>(this.baseURL + 'url/departamento/detail' + `/${id}`)
  }
  
  updateDepartment(updateDepartment: Department): Observable<any> {
    return this._httpClient.put<any>(this.baseURL + 'url/departamento/update'+ `/${updateDepartment.id}`, updateDepartment);
  }

  deleteDepartment(deleteDepartment:Department): Observable<any> {
    return this._httpClient.put<any>(this.baseURL + 'url/departamento/delete' + `/${deleteDepartment.id}`,deleteDepartment);
  }

}
