import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  getAll() : Observable<ICity[]> {
    return this.http.get<ICity[]>('./assets/city.json');
  }

  constructor(
    private http: HttpClient
  ) { }
}
