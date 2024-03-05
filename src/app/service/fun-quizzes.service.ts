import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunQuizzesService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, optionDifLang: any[], answer: any, questionDifLang: any, thumbnail: any) {

    const formData = new FormData();

    formData.append("question", question);
    formData.append("questionDifLang", JSON.stringify(questionDifLang));
    formData.append("optionDifLang", JSON.stringify(optionDifLang));
    formData.append("thumbnail", thumbnail);
    formData.append("answer", answer);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("https://brochill.onrender.com/api/fun-quizzes/add-question", formData, _options);

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
