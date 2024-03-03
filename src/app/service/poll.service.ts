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
  addPoll(question: any, options: any, questionDifLang: any) {
    const formData = new FormData();

    options.forEach((option: any) => {
      formData.append('options', option);
    });
    formData.append('question', question);
    formData.append('questionDifLang', JSON.stringify(questionDifLang));

    return this.http.post("/api/poll/add-text-poll", formData)
  }
  addImgPoll(options: any, question: any) {

    const formData = new FormData();

    options.forEach((option: any) => {
      formData.append('options', option);
    });
    formData.append('question', question);
    return this.http.post("/api/poll/add-img-poll", formData)
  }

  getAllpoll() {
    return this.http.get("/api/poll/getAll", { params: { lang: "tamil" } });
  }

  votee(id: any, option: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("/api/poll/vote", { pollId: id, option }, _options)
  }
  getPollById(id: any) {
    return this.http.get("/api/poll/get-poll/" + id);
  }

  like(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("/api/poll/likes", { pollId: id }, _options)
  }

  share(pollId: any) {
    return this.http.post('/api/poll/share', { pollId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(pollId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('/api/poll/add-comment', { pollId, comment }, _options)
  }

  deletePoll(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('/api/poll/delete/' + id, _options);
  }

}


