import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private http: HttpClient) { }

  addLanguage(language: any, native: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.post("https://brochill.onrender.com/api/language/add-language", { language: language, native }, _options)

  }

  getlanguage() {

    return this.http.get("https://brochill.onrender.com/api/language");

  }

  addThum(thumb: any, category: any) {

    const formData = new FormData();

    formData.append('category', category);
    formData.append('thumbnail', thumb);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post("https://brochill.onrender.com/api/menu/add-thumbnail", formData, _options)


  }

  addSubcategory(category: any, thumbnail: any, title: any) {
    const formData = new FormData();

    formData.append('category', category);
    formData.append('thumbnail', thumbnail);
    formData.append('title', title);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post("https://brochill.onrender.com/api/menu/add-subcategory", formData, _options)

  }

  getSub(category: any) {
    return this.http.get("https://brochill.onrender.com/api/menu/get-subcategory/" + category)
  }


}
