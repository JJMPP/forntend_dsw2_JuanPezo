import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var iziToast;

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(
    private _router: Router
  ) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }

  public isLogged(): boolean {

    if (this.getToken()) {
      return true;
    }
    return false;

  }

  public getUserName(): string {
    if (!this.isLogged()) {
      return null!;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public getRole(): string {
    if (!this.isLogged()) {
      return null!;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const role = values.roles;
    return role;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      iziToast.show({
        title: 'Error',
        position: 'topRight',
        color: 'red',
        timeout: 1000,
        message: '¡Solo los usuarios administradores pueden acceder!'
      });
      return false;
    }     
    return true;
  }

  public logout(): void {
    window.localStorage.clear();
    this._router.navigate(['/login']);
  }
}
