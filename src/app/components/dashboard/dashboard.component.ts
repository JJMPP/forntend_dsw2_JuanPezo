import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {


  constructor(
    private _tokenService: TokenService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

}
