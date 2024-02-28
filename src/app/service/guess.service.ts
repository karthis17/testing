import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  constructor(private http: HttpClient) { }

  addQuestion(question: any, answer: any, options: any[], questionType: any, optionsType: any) {

    const formData = new FormData();

    options.forEach(option => {
      formData.append("options", option);
    });

    formData.append("correctOption", answer);
    formData.append("question", question);
    formData.append("questionType", questionType);
    formData.append("optionsType", optionsType);

    return this.http.post("http://localhost:3000/api/guess-game/upload", formData)

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/guess-game/get-all");
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/guess-game/delete/' + id, _options);
  }

}
