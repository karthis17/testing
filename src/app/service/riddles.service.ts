import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiddlesService {

  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addRiddle(quizze: any) {
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




    formData.append("questions", JSON.stringify(quizze.questions));
    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("isActive", quizze.isActive);
    formData.append("referencesImage", quizze.referenceImage);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("http://localhost:3000/api/riddles/add-riddle", formData, _options)

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/riddles/all");
  }

  anser(userAnswer: any, riddle_id: any) {
    return this.http.post("https://brochill.onrender.com/api/riddles/answer", { userAnswer, riddle_id }, this._options);
  }

  comment(riddle_id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("https://brochill.onrender.com/api/riddles/add-comment", { riddle_id, comment }, _options);
  }

  deleteRiddle(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/riddles/delete/' + id, _options);
  }

  updateRiddle(quizze: any, id: any) {
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

            console.log(option.option)
          formData.append("option", option.option);
        })
      }
    });





    formData.append("questions", JSON.stringify(quizze.questions));

    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);
    formData.append("category", quizze.category);
    formData.append("subCategory", quizze.subCategory);

    formData.append("id", id);
    formData.append("isActive", quizze.isActive)


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.put("http://localhost:3000/api/riddles/update", formData, _options)

  }

  publish(id: any) {
    return this.http.get("http://localhost:3000/api/riddles/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("http://localhost:3000/api/riddles/draft/" + id);

  }
}
