import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuntestService {

  constructor(private http: HttpClient) { }

  addQuestion(question: any, texts: any, frames: any, description: any, language: any, thumb: any, type: any, file: any[], noOfimage: any, range: any, isActive: any) {
    const formData = new FormData();
    console.log(thumb)
    formData.append("question", question);
    formData.append("noOfUserImage", noOfimage);
    formData.append("isActive", isActive);

    formData.append("texts", JSON.stringify(texts));

    formData.append("frames", JSON.stringify(frames));
    formData.append("description", description);
    formData.append("language", language);
    formData.append("thumbnail", thumb);
    formData.append("type", type);

    if (range) {
      formData.append("range", JSON.stringify(range));
    }

    console.log(file);
    file.forEach((element: any) => {
      formData.append("frame", element);
    });

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/funtest/add-question", formData, _options)

  }

}
