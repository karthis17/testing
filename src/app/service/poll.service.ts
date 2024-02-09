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
  addPoll(question: any, options: any) {
    const formData = new FormData();

    options.forEach((option: any) => {
      formData.append('options', option);
    });
    formData.append('question', question);

    return this.http.post("http://localhost:3000/api/poll/add-text-poll", formData)
  }
  addImgPoll(options: any, question: any) {

    const formData = new FormData();

    options.forEach((option: any) => {
      formData.append('options', option);
    });
    formData.append('question', question);
    return this.http.post("http://localhost:3000/api/poll/add-img-poll", formData)
  }

  getAllpoll() {
    return this.http.get("http://localhost:3000/api/poll/getAll");
  }

  votee(id: any, option: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/api/poll/vote", { pollId: id, option }, _options)
  }
  getPollById(id: any) {
    return this.http.get("http://localhost:3000/api/poll/get-poll/" + id);
  }
}


