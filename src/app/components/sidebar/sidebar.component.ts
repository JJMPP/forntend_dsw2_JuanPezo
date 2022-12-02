import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  username: string;

  constructor(
    private _tokenService: TokenService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.username = this._tokenService.getUserName();
  }

  onLogOut(): void {
    this._tokenService.logout();
    this._router.navigate(['/login']);
  }

}
