import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tower } from '../models/tower';

@Injectable({
  providedIn: 'root'
})
export class TowerService {

  baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient
  ) { }

  listTowers():Observable<Tower[]>{
    return this._httpClient.get<Tower[]>(this.baseURL+"url/tower/list");
  } 
}
