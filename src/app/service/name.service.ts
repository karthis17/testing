import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameService {



  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addMeaning(letter: string, meaning: string) {
    console.log(letter, meaning)
    return this.http.post("http://localhost:3000/api/nameing/add-name-meaning", { letter: letter, meaning: meaning }, this._options);
  }

  addFact(name: string, fact: string) {
    return this.http.post("http://localhost:3000/api/nameing/add-name-fact", { name, fact }, this._options);
  }

  findmeaning(name: string) {
    return this.http.post("http://localhost:3000/api/nameing/get-name-meaning", { name }, this._options);
  }

  findfact(name: string) {
    return this.http.post("http://localhost:3000/api/nameing/get-name-fact", { name }, this._options);
  }

  deleteNameMean(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/nameing/name-meaning/delete/' + id, _options);
  }

  deleteNameFact(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/nameing/name-fact/delete/' + id, _options);
  }

  getNameMen() {
    return this.http.get('http://localhost:3000/api/nameing/name-meaning/get-all');
  }

  getNameFact() {
    return this.http.get('http://localhost:3000/api/nameing/name-fact/get-all');
  }

  updateMeaning(letter: string, meaning: string, id: any) {
    console.log(letter, meaning)
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.put("http://localhost:3000/api/nameing/name-meaning/update", { id, letter, meaning }, _options);
  }

  updateFact(name: string, fact: string, id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.put("http://localhost:3000/api/nameing/name-fact/update", { id, name, fact }, _options);
  }

}
