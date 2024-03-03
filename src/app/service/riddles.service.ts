import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiddlesService {

  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addRiddle(question: any, answer: any, questionDifLang: any, answerDifLang: any) {
    return this.http.post("https://brochill.onrender.com/api/riddles/add-riddle", { question, answer, questionDifLang, answerDifLang }, this._options);
  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/riddles/get-all");
  }

  anser(userAnswer: any, riddle_id: any) {
    return this.http.post("https://brochill.onrender.com/api/riddles/answer", { userAnswer, riddle_id }, this._options);
  }

  comment(riddle_id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("https://brochill.onrender.com/api/riddles/add-comment", { riddle_id, comment }, _options);
  }

  deleteRiddle(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/riddles/delete/' + id, _options);
  }

  updateRiddle(riddle_id: any, question: any, answer: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put('https://brochill.onrender.com/api/riddles/update', { question, answer, riddle_id }, _options)
  }

}
