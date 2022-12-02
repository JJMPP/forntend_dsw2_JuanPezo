import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listRoles():Observable<any>{
    return this._httpClient.get<any>(this.baseURL+"auth/listrole");
  }

  addUser(reg:User): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + 'auth/register', reg);
  }
}
