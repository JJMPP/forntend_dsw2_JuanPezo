import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  username: string;

  public role:any = '';

  constructor(
    private _tokenService: TokenService,
    private _router: Router
  ) { 
    this.username = this._tokenService.getUserName();
    this.role = this._tokenService.getRole();     
  }

  ngOnInit(): void {
  }

  onLogOut(): void {
    this._tokenService.logout();
    this._router.navigate(['/login']);
  }

}
