import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunQuizzesService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(quizze: any) {

    const formData = new FormData();

    quizze.questions.map((question: any) => {
      if (question.questionType === 'image') {
        formData.append("question", question.question)
      }
    })



    quizze.questions.map((question: any) => {
      if (question.optionType === 'image') {

        question.options.map((option: any) => {
          formData.append("option", option.option);
        })
      }
    });


    quizze.result.map((question: any) => {
      formData.append("answer", question.resultImg);
    })


    formData.append("questions", JSON.stringify(quizze.questions));
    formData.append("results", JSON.stringify(quizze.result));
    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);
    formData.append("category", quizze.category);
    formData.append("subCategory", quizze.subCategory);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("http://localhost:3000/api/fansquiz/add-quizze", formData, _options)

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/fansquiz/get-all", { params: { lang: "tamil" } });
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/fansquiz/delete/' + id, _options);
  }


  update(id: any, question: any, options: any[]) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };

    return this.http.put("https://brochill.onrender.com/api/fun-quizzes/update", { id, question, options }, _options)

  }

}
