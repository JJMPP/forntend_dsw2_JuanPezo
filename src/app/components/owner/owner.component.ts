import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html'
})
export class OwnerComponent implements OnInit {

  owners: Owner[] = [];

  constructor(
    private _ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this._ownerService.listOwner().subscribe(
      res=> {        
        this.owners = res;        
      }, err=> {
        console.log(err);        
      }
    );
  }

}
