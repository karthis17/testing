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
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/partygames/delete/' + id, _options);
  }

  update(id: any, option1: any, option2: any, point1: any, point2: any, questions: any, filePath: any) {
    const formData = new FormData();

    formData.append('id', id)
    formData.append('question', questions)
    formData.append('option1', option1)
    formData.append('option2', option2)
    formData.append('point1', point1)
    formData.append('point2', point2)
    formData.append('filePath', filePath)
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.put("https://brochill.onrender.com/api/partygames/update", formData, _options);

  }


}
