import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickKickService {

  constructor(private http: HttpClient) { }

  addQuestion(file: any, option1: any, option2: any, point1: any, point2: any) {
    const formData = new FormData();

    formData.append('question', file)
    formData.append('option1', option1)
    formData.append('option2', option2)
    formData.append('point1', point1)
    formData.append('point2', point2)

    return this.http.post("http://localhost:3000/api/pick-and-kick/add-question", formData);

  }

  getAll() {
    return this.http.get("http://localhost:3000/api/pick-and-kick/get-all");
  }
  getById(id: any) {
    return this.http.get("http://localhost:3000/api/pick-and-kick/get-by-id/" + id);
  }
  play(id: any, option: any) {
    return this.http.post("http://localhost:3000/api/pick-and-kick/play", { questionId: id, option });
  }

}
