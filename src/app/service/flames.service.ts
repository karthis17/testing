import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlamesService {

  constructor(private http: HttpClient) { }

  uploadFlames(flames: string, files: any) {
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

  getAll() {
    return this.http.get("http://localhost:3000/api/flames/get-all");
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('http://localhost:3000/api/flames/delete/' + id, _options);
  }

  update(flames: string, files: any, filePath: any, id: any) {
    const formData = new FormData();

    formData.append('word', flames);
    formData.append('image', files);
    formData.append('imagePath', filePath);
    formData.append('id', id);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("http://localhost:3000/api/flames/update", formData, _options)

  }

}
