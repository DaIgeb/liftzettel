import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TQuestion, IQuestionaire } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  public getAll(): Observable<IQuestionaire[]> {
    return this.http.get<IQuestionaire[]>(`./assets/questionaire.json`);
  }

  constructor(
    private http: HttpClient
  ) { }
}
