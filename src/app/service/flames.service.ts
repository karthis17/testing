import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlamesService {

  constructor(private http: HttpClient) { }

  uploadFlames(flames: string, files: any, thumbnail: any) {
    const formData = new FormData();

    formData.append('word', flames);
    formData.append('image', files);
    formData.append("thumbnail", thumbnail);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/flames/add-image", formData, _options)

  }

  flamesFind(name1: string, name2: string) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("https://brochill.onrender.com/api/flames", { name1, name2 }, _options);
  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/flames/get-all");
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/flames/delete/' + id, _options);
  }

  update(flames: string, files: any, filePath: any, id: any) {
    const formData = new FormData();

    formData.append('word', flames);
    formData.append('image', files);
    formData.append('imagePath', filePath);
    formData.append('id', id);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/flames/update", formData, _options)

  }

}
