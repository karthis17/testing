import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  constructor(private http: HttpClient) { }

  addQuestion(question: any, answer: any, options: any[]) {

    const formData = new FormData();

    options.forEach(option => {
      formData.append("options", option);
    });

    formData.append("correctOption", answer);
    formData.append("question", question);

    return this.http.post("http://localhost:3000/api/guess-game/upload", formData)

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/guess-game/get-all");
  }

}
