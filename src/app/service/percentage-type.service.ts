import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentageTypeService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, frames: any, images: any[], questionDifLang: any, thumbnail: any) {


    const formData = new FormData();

    formData.append("question", question);
    images.forEach(image => {
      formData.append("frame", image);
    })
    formData.append("frames", JSON.stringify(frames));
    formData.append("thumbnail", thumbnail);


    if (questionDifLang) {

      formData.append("questionDifLang", JSON.stringify(questionDifLang));
    }
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("http://localhost:3000/api/percentage-type/add-frame", formData, _options);

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/percentage-type/get-all", { params: { lang: "tamil" } });
  }

  getQuestion(id: any) {
    return this.http.get("https://brochill.onrender.com/api/percentage-type/question/" + id);
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/percentage-type/delete/' + id, _options);
  }

  update(question: any, id: any, frames: any, files: any[], questionDifLang: any) {
    const formData = new FormData();
    formData.append('question', question);

    files.forEach(file => formData.append('frame', file));
    formData.append("frames", JSON.stringify(frames));
    formData.append('id', id);

    if (questionDifLang) {

      formData.append("questionDifLang", JSON.stringify(questionDifLang));
    }


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/percentage-type/update", formData)

  }

  result(id: any, range: any) {
    return this.http.post("https://brochill.onrender.com/api/percentage-type/result", { id, range }, this._options);
  }

  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("https://brochill.onrender.com/api/percentage-type/likes", { id }, _options);
  }

  share(id: any) {
    return this.http.post('https://brochill.onrender.com/api/percentage-type/share', { id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/percentage-type/add-comment', { id, comment }, _options)
  }
}
