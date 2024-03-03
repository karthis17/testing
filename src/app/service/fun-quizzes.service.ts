import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunQuizzesService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, options: any[], questionDifLang: any) {

    return this.http.post("https://brochill.onrender.com/api/fun-quizzes/add-question", { question, options, questionDifLang }, this._options);

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/fun-quizzes/get-all", { params: { lang: "tamil" } });
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/fun-quizzes/delete/' + id, _options);
  }


  update(id: any, question: any, options: any[]) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put("https://brochill.onrender.com/api/fun-quizzes/update", { id, question, options }, _options)

  }

}
