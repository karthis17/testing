import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuntestService {

  constructor(private http: HttpClient) { }

  addQuestion(question: any, texts: any, frames: any, description: any, language: any, thumb: any, type: any, file: any[], noOfimage: any, range: any, isActive: any, referenceImage: any) {
    const formData = new FormData();
    console.log(thumb)
    formData.append("question", question);
    formData.append("noOfUserImage", noOfimage);
    formData.append("isActive", isActive);

    formData.append("texts", JSON.stringify(texts));

    formData.append("frames", JSON.stringify(frames));
    formData.append("description", description);
    formData.append("language", language);
    formData.append("referenceImage", referenceImage);
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

    return this.http.post("https://brochill.onrender.com/api/funtest/add-question", formData, _options)

  }

  update(question: any, texts: any, frames: any, description: any, language: any, thumb: any, type: any, file: any[], noOfimage: any, range: any, isActive: any, id: any, referenceImage: any) {
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
    formData.append("referenceImage", referenceImage);
    formData.append("type", type);
    formData.append("id", id);

    if (range) {
      formData.append("range", JSON.stringify(range));
    }

    console.log(file);
    file.forEach((element: any) => {
      formData.append("frame", element);
    });

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/funtest/update", formData, _options)

  }

  all() {
    return this.http.get("https://brochill.onrender.com/api/funtest/all");
  }

  publish(id: any) {
    return this.http.get("https://brochill.onrender.com/api/funtest/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("https://brochill.onrender.com/api/funtest/draft/" + id);

  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.delete("https://brochill.onrender.com/api/funtest/delete/" + id, _options);
  }

}
