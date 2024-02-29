import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomTextService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, texts: any) {

    return this.http.post("http://localhost:3000/api/random-text/add-question", { question, texts }, this._options);

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/random-text/get-all");
  }

  getQuestion(id: any) {
    return this.http.get("http://localhost:3000/api/random-text/question/" + id);
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/random-text/delete/' + id, _options);
  }


  update(question: any, texts: any, id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put("http://localhost:3000/api/random-text/update", { question, texts, id }, _options)

  }


  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("http://localhost:3000/api/random-text/likes", { id }, _options);
  }

  share(id: any) {
    return this.http.post('http://localhost:3000/api/random-text/share', { id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/api/random-text/add-comment', { id, comment }, _options)
  }
}
