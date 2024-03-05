import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomTextService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addQuestion(question: any, texts: any[], file: any, frame_size: any, coordinates: any, thumbnail: any, reff: any) {

    const formData = new FormData();

    formData.append('question', question);
    formData.append('frame', file);
    formData.append('frame_size', JSON.stringify(frame_size));
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append("thumbnail", thumbnail);
    formData.append("referenceImage", reff);

    texts.forEach(text => {
      formData.append('texts', text);
    })
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/random-text/add-question", formData, _options);

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/random-text/get-all");
  }

  getQuestion(id: any) {
    return this.http.get("https://brochill.onrender.com/api/random-text/question/" + id);
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/random-text/delete/' + id, _options);
  }


  update(question: any, texts: any[], id: any, frame_path: any, frame_url: any, file: any, coordinates: any, frame_size: any) {

    const formData = new FormData();

    formData.append('question', question);
    formData.append('frame', file);
    formData.append('frame_size', JSON.stringify(frame_size));
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append('framePath', frame_path);
    formData.append('frameUrl', frame_url);
    formData.append('id', id);

    texts.forEach(text => {
      formData.append('texts', text);
    })

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/random-text/update", formData, _options)

  }


  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("https://brochill.onrender.com/api/random-text/likes", { id }, _options);
  }

  share(id: any) {
    return this.http.post('https://brochill.onrender.com/api/random-text/share', { id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/random-text/add-comment', { id, comment }, _options)
  }
}
