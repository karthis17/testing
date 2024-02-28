import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiddlesService {

  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addRiddle(question: any, answer: any) {
    return this.http.post("http://localhost:3000/api/riddles/add-riddle", { question, answer }, this._options);
  }

  getAll() {
    return this.http.get("http://localhost:3000/api/riddles/get-all");
  }

  anser(userAnswer: any, riddle_id: any) {
    return this.http.post("http://localhost:3000/api/riddles/answer", { userAnswer, riddle_id }, this._options);
  }

  comment(riddle_id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/api/riddles/add-comment", { riddle_id, comment }, _options);
  }

  deleteRiddle(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/riddles/delete/' + id, _options);
  }

  updateRiddle(riddle_id: any, question: any, answer: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put('http://localhost:3000/api/riddles/update', { question, answer, riddle_id }, _options)
  }

}
