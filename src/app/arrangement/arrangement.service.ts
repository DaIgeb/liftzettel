import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IArrangementState, IArrangement } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArrangementService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() : Observable<IArrangement[]> {
    return this.http.get<IArrangement[]>(`./assets/arrangement.json`);
  }
}
