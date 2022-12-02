import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/models/visitor';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html'
})
export class VisitorComponent implements OnInit {

  visitors: Visitor[] = [];

  constructor(
    private _visitService: VisitService
  ) {
    this._visitService.listVisitor().subscribe({
      next: res=> {
        this.visitors = res;       
        console.log(this.visitors);        
      },
      error: err=> {
        console.log(err);        
      }
    });
  }

  ngOnInit(): void {
  }

}
