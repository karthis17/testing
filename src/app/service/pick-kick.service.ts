import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickKickService {

  constructor(private http: HttpClient) { }

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




    formData.append("questions", JSON.stringify(quizze.questions));
    formData.append("description", quizze.description);
    formData.append("subCategory", quizze.subCategory);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);

    formData.append("isActive", quizze.isActive);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/partygames/add-question", formData, _options);

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/partygames/get-all");
  }
  getById(id: any) {
    return this.http.get("https://brochill.onrender.com/api/partygames/get-by-id/" + id);
  }
  play(id: any, option: any) {
    return this.http.post("https://brochill.onrender.com/api/partygames/play", { questionId: id, option });
  }
  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.delete("http://localhost:3000/api/partygames/delete/" + id, _options);
  }

  all() {
    return this.http.get("http://localhost:3000/api/partygames/all");
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
    return this.http.put("http://localhost:3000/api/partygames/update", formData, _options)

  }
  publish(id: any) {
    return this.http.get("http://localhost:3000/api/partygames/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("http://localhost:3000/api/partygames/draft/" + id);

  }



}
