import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  constructor(private http: HttpClient) { }

  addQuestion(question: any, answer: any, options: any[], questionType: any, optionsType: any, questionDifLang: any) {

    const formData = new FormData();

    options.forEach(option => {
      formData.append("options", option);
    });

    formData.append("correctOption", answer);
    formData.append("question", question);
    formData.append("questionType", questionType);
    formData.append("optionsType", optionsType);
    formData.append("questionDifLang", JSON.stringify(questionDifLang));

    return this.http.post("https://brochill.onrender.com/api/guess-game/upload", formData)

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/guess-game/get-all", { params: { lang: "tamil" } });
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/guess-game/delete/' + id, _options);
  }

}
