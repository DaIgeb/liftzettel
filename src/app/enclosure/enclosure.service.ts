import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEnclosure } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnclosureService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IEnclosure[]> {
    return this.http.get<IEnclosure[]>('./assets/enclosure.json');
  }
}
