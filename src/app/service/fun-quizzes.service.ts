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
      if (question.questionType === 'image' || question.questionType === 'both') {
        formData.append("question", question.imageQuestion)
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

    formData.append("subCategory", quizze.subCategory);

    formData.append("isActive", quizze.isActive);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("https://brochill.onrender.com/api/fansquiz/add-quizze", formData, _options)

  }



  update(quizze: any, id: any) {
    const formData = new FormData();

    quizze.questions.map((question: any) => {
      if (question.questionType === 'both' || question.questionType === 'image') {
        if (typeof question.imageQuestion !== 'string') {

          formData.append("question", question.imageQuestion)
        }
      }
    })



    quizze.questions.map((question: any) => {
      if (question.optionType === 'image') {

        question.options.map((option: any) => {
          if (typeof option.option !== 'string')

            formData.append("option", option.option);
        })
      }
    });


    quizze.result.map((question: any) => {
      if (typeof question.result !== 'string') {

        formData.append("answer", question.resultImg);
      }
    })


    formData.append("questions", JSON.stringify(quizze.questions));
    formData.append("results", JSON.stringify(quizze.result));
    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);

    formData.append("subCategory", quizze.subCategory);

    formData.append("isActive", quizze.isActive);

    formData.append("id", id);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.put("https://brochill.onrender.com/api/fansquiz/update", formData, _options)

  }

  publish(id: any) {
    return this.http.get("https://brochill.onrender.com/api/fansquiz/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("https://brochill.onrender.com/api/fansquiz/draft/" + id);

  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.delete("https://brochill.onrender.com/api/fansquiz/delete/" + id, _options);
  }

  all() {
    return this.http.get("https://brochill.onrender.com/api/fansquiz/all");
  }

}
