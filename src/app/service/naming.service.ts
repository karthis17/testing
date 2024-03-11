import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamingService {

  constructor(private http: HttpClient) { }
  add(frames: any, description: any, language: any, thumb: any, type: any, file: any[], fact: any, meaning: any, percentageTexts: any, isActive: any) {
    const formData = new FormData();
    console.log(thumb)
    if (percentageTexts) {

      formData.append("percentageTexts", JSON.stringify(percentageTexts));
    }
    if (fact) {
      formData.append("facts", JSON.stringify(fact));

    }

    if (meaning) {

      formData.append("meanings", JSON.stringify(meaning));
    }

    formData.append("frames", JSON.stringify(frames));
    formData.append("description", description);
    formData.append("language", language);
    formData.append("thumbnail", thumb);
    formData.append("isActive", isActive);
    formData.append("type", type);


    console.log(file);
    file.forEach((element: any) => {
      formData.append("frame", element);
    });

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/nametest/add", formData, _options)

  }
}
