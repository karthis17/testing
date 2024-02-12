import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlamesService {

  constructor(private http: HttpClient) { }

  uploadFlames(flames: string, files: File) {
    const formData = new FormData();

    formData.append('word', flames);
    formData.append('image', files);

    return this.http.post("http://localhost:3000/api/flames/add-image", formData)

  }

  flamesFind(name1: string, name2: string) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/api/flames", { name1, name2 }, _options);
  }

}
