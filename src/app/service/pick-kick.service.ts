import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickKickService {

  constructor(private http: HttpClient) { }

  addQuestion(file: any, option1: any, option2: any, point1: any, point2: any, option1DifLang: any, option2DifLang: any) {
    const formData = new FormData();

    formData.append('question', file)
    formData.append('option1', option1)
    formData.append('option2', option2)
    formData.append('point1', point1)
    formData.append('point2', point2)
    formData.append('option1DifLang', JSON.stringify(option1DifLang))
    formData.append('option2DifLang', JSON.stringify(option2DifLang))

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/pick-and-kick/add-question", formData, _options);

  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/pick-and-kick/get-all");
  }
  getById(id: any) {
    return this.http.get("https://brochill.onrender.com/api/pick-and-kick/get-by-id/" + id);
  }
  play(id: any, option: any) {
    return this.http.post("https://brochill.onrender.com/api/pick-and-kick/play", { questionId: id, option });
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/pick-and-kick/delete/' + id, _options);
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
    return this.http.put("https://brochill.onrender.com/api/pick-and-kick/update", formData, _options);

  }


}
