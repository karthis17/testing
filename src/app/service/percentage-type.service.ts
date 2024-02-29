import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentageTypeService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, result: any) {

    return this.http.post("http://localhost:3000/api/percentage-type/add-question", { question, result }, this._options);

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/percentage-type/get-all");
  }

  getQuestion(id: any) {
    return this.http.get("http://localhost:3000/api/percentage-type/question/" + id);
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/percentage-type/delete/' + id, _options);
  }


  update(question: any, result: any, id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put("http://localhost:3000/api/percentage-type/update", { question, result, id }, _options)

  }

  result(id: any, range: any) {
    return this.http.post("http://localhost:3000/api/percentage-type/result", { id, range }, this._options);
  }

  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("http://localhost:3000/api/percentage-type/likes", { id }, _options);
  }

  share(id: any) {
    return this.http.post('http://localhost:3000/api/percentage-type/share', { id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/api/percentage-type/add-comment', { id, comment }, _options)
  }
}
