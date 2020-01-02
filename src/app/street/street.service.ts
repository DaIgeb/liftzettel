import { Injectable } from '@angular/core';
import { IStreet } from './model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreetService {  
  getAll() : Observable<IStreet[]> {
    return this.http.get<IStreet[]>('./assets/street.json');
  }

  constructor(
    private http: HttpClient
  ) { }
}
