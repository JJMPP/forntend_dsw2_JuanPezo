import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listOwner():Observable<Owner[]>{
    return this._httpClient.get<Owner[]>(this.baseURL+"url/propietario/list");
  }

  addOwner(reg:Owner): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'url/propietario/create', reg);
  }
}
