import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunQuizzesService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, options: any[]) {

    return this.http.post("http://localhost:3000/api/fun-quizzes/add-question", { question, options }, this._options);

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/fun-quizzes/get-all");
  }



}
