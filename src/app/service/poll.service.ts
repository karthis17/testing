import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }
  _option = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  addPoll(imageQuestion: any, question: any, options: any, description: any, language: any, thumbnail: any, questionType: any, optionType: any, isActive: any) {
    const formData = new FormData();

    formData.append('textQuestion', question);

    if (imageQuestion) {

      formData.append('imageQuestion', imageQuestion);
    }
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("questionType", questionType);
    formData.append("optionType", optionType);
    formData.append("isActive", isActive);

    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    if (optionType === 'image') {
      options.map((m: any) => {

        console.log(m);
        formData.append('option', m.option);
      })
    }

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/polls/add-poll", formData, _options)
  }
  addImgPoll(options: any, question: any, questionDifLang: any, thumbnail: any) {

    const formData = new FormData();

    formData.append('questionDifLang', JSON.stringify(questionDifLang));

    options.forEach((option: any) => {
      formData.append('options', option);
    });
    formData.append('question', question);
    formData.append("thumbnail", thumbnail);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post("https://brochill.onrender.com/api/polls/add-img-poll", formData, _options)
  }

  getAllpoll() {
    return this.http.get("https://brochill.onrender.com/api/polls/all");
  }


  update(imageQuestion: any, question: any, options: any, description: any, language: any, thumbnail: any, questionType: any, optionType: any, isActive: any, id: any) {

    const formData = new FormData();

    formData.append('textQuestion', question);

    if (imageQuestion) {

      formData.append('imageQuestion', imageQuestion);
    }
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("questionType", questionType);
    formData.append("optionType", optionType);
    formData.append("isActive", isActive);
    formData.append("id", id);


    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    if (optionType === 'image') {
      options.map((m: any) => {
        if (typeof m !== 'string') {
          console.log(m);
          formData.append('option', m.option);
        }
      })
    }

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/polls/update", formData, _options)
  }


  deletePoll(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/polls/delete/' + id, _options);
  }

  publish(id: any) {
    return this.http.get("https://brochill.onrender.com/api/polls/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("https://brochill.onrender.com/api/polls/draft/" + id);

  }

}


