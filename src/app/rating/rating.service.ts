import { Injectable } from '@angular/core';
import { IRating } from './model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public getAll(country: string): Observable<IRating[]> {
    return this.http.get<IRating[]>(`./assets/rating_${country}.json`);
  }

  constructor(
    private http: HttpClient
  ) { }
}
