import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  listUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseURL+"auth/list");
  }

  listUsersOwner():Observable<NewUser[]>{
    return this.httpClient.get<NewUser[]>(this.baseURL+"url/visita/findUserListByRole?id=3");
  }

  public newUser(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + 'auth/register', newUser);
  }

  public login_admin(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.baseURL + 'auth/login', loginUser);
  }

  public getUser(id): Observable<User>{
    return this.httpClient.get<User>(this.baseURL + 'auth/detail' + `/${id}`)
  }

  public updateUser(updateUser: User): Observable<any> {
    return this.httpClient.put<any>(this.baseURL + 'auth/update'+ `/${updateUser.id}`, updateUser);
  }

  public deleteUser(deleteUser:User): Observable<any> {
    return this.httpClient.put<any>(this.baseURL + 'auth/deleteUser' + `/${deleteUser.id}`,deleteUser);
  }
}
