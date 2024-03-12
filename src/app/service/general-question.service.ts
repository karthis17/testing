import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralQuestionService {


  constructor(private http: HttpClient) { }

  addQuestion(quizze: any, resultImage: any) {

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
    if (quizze.result.length > 0) {
      formData.append("results", JSON.stringify(quizze.result));
    }
    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);

    formData.append("isActive", quizze.isActive);

    formData.append("resultImage", resultImage)
    formData.append("category", quizze.category);
    formData.append("subCategory", quizze.subCategory);
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("http://localhost:3000/api/gkquiz/add-question", formData, _options)

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/gkquiz/all");
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/gkquiz/delete/' + id, _options);
  }


  all() {
    return this.http.get("http://localhost:3000/api/gkquiz/all");
  }


  update(quizze: any, resultImage: any, id: any) {
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


    if (resultImage) {
      quizze.result.map((question: any) => {
        if (typeof question.resultImg !== 'string')
          formData.append("answer", question.resultImg);
      })
    }


    formData.append("questions", JSON.stringify(quizze.questions));
    if (resultImage) {
      if (quizze.result.length > 0) {
        formData.append("results", JSON.stringify(quizze.result));
      }
    }
    formData.append("description", quizze.description);
    formData.append("language", quizze.language);
    formData.append("referencesImage", quizze.referenceImage);
    formData.append("category", quizze.category);
    formData.append("subCategory", quizze.subCategory);

    formData.append("resultImage", resultImage)
    formData.append("id", id);
    formData.append("isActive", quizze.isActive)


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.put("http://localhost:3000/api/gkquiz/update", formData, _options)

  }
  publish(id: any) {
    return this.http.get("http://localhost:3000/api/gkquiz/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("http://localhost:3000/api/gkquiz/draft/" + id);

  }

}
