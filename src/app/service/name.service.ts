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



}
