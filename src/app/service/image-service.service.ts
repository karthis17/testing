import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }


  getUsers() {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };



    return this.http.get('https://brochill.onrender.com/api/users/me', _options)
  }
  uploadImage(file: any, description: string, category: any, title: any, type: any, descriptionDifLang: any, titleDifLang: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', type);
    formData.append('title', title);
    formData.append('titleDifLang', JSON.stringify(titleDifLang));
    formData.append('descriptionDifLang', JSON.stringify(descriptionDifLang));

    return this.http.post('https://brochill.onrender.com/api/img/upload', formData, _options);
  }

  getCategory(lang: any) {
    return this.http.get('https://brochill.onrender.com/api/img/categories', { params: { lang: lang } });

  }
  addCategory(category: any, title: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/img/add-category', { category, title }, _options);

  }

  getPost(category: any) {

    return this.http.get('https://brochill.onrender.com/api/img/post-category/' + category, { params: { lang: 'tamil' } });
  }

  like(postId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('https://brochill.onrender.com/api/img/likes', { postId }, _options)
  }

  share(postId: any) {
    return this.http.post('https://brochill.onrender.com/api/img/share', { postId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(postId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/img/add-comment', { postId, comment }, _options)
  }


  upload(quizze: any) {


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
    formData.append("category", quizze.category);
    formData.append("isActive", quizze.isActive);
    formData.append("subCategory", quizze.subCategory);
    formData.append("referencesImage", quizze.referenceImage);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("http://localhost:3000/api/personalityquiz/add-quizze", formData, _options)

  }

  addTextQuizzes(file: any, state1: any[], state2: any[], state3: any[], result: any[]) {

    const formData = new FormData();

    formData.append("question", file);
    formData.append("statement_1", JSON.stringify(state1));
    formData.append("statement_2", JSON.stringify(state2));
    formData.append("statement_3", JSON.stringify(state3));
    result.map((res) => {

      formData.append("answer", res.resultImg);
    });

    formData.append("result", JSON.stringify(result));
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/quizzes/add-text-quizzes", formData, _options)

  }
  getQuizzes() {
    return this.http.get('https://brochill.onrender.com/api/quizzes/get-all-quizzes');
  }

  result(quizze_id: any, score: number) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/quizzes/get-result', { score, quizze_id }, _options)
  }

}
