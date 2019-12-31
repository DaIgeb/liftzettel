import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IState } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  getAll() : Observable<IState[]> {
    return this.http.get<IState[]>('./assets/state.json');
  }

  constructor(
    private http: HttpClient
  ) { }
}
