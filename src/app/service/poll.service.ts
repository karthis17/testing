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
  addPoll(question: any, options: any, questionDifLang: any, thumbnail: any) {
    const formData = new FormData();

    formData.append('optionDifLang', JSON.stringify(options));
    formData.append('question', question);
    formData.append('questionDifLang', JSON.stringify(questionDifLang));
    formData.append("thumbnail", thumbnail);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/poll/add-text-poll", formData, _options)
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
    return this.http.post("https://brochill.onrender.com/api/poll/add-img-poll", formData, _options)
  }

  getAllpoll() {
    return this.http.get("https://brochill.onrender.com/api/poll/getAll", { params: { lang: "tamil" } });
  }

  votee(id: any, option: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("https://brochill.onrender.com/api/poll/vote", { pollId: id, option }, _options)
  }
  getPollById(id: any) {
    return this.http.get("https://brochill.onrender.com/api/poll/get-poll/" + id);
  }

  like(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("https://brochill.onrender.com/api/poll/likes", { pollId: id }, _options)
  }

  share(pollId: any) {
    return this.http.post('https://brochill.onrender.com/api/poll/share', { pollId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(pollId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/poll/add-comment', { pollId, comment }, _options)
  }

  deletePoll(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/poll/delete/' + id, _options);
  }

}


