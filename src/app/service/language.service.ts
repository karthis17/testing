import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private http: HttpClient) { }

  addLanguage(language: any, native: any, categoyNative: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.post("http://localhost:3000/api/language/add-language", { language: language, native, categoyNative }, _options)

  }

  getlanguage() {

    return this.http.get("http://localhost:3000/api/language");

  }


}
