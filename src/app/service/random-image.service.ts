import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  addFrame(frame: any, frameName: any, frame_size: any, coordinates: any, thumbnail: any, reff: any) {


    const formData = new FormData();

    formData.append('frame', frame)
    formData.append('frameName', frameName)
    formData.append('coordinates', JSON.stringify(coordinates))
    formData.append('frame_size', JSON.stringify(frame_size));
    formData.append("thumbnail", thumbnail);
    formData.append("referenceImage", reff);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/random-image/upload-frame", formData, _options);

  }

  play() {
    return this.http.get("https://brochill.onrender.com/api/random-image/get-frame");
  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/random-image/get-all");
  }

  delete(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('https://brochill.onrender.com/api/random-image/delete/' + id, _options);
  }


  update(frame: any, frameName: any, frameUrl: any, framePath: any, id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData();

    formData.append('frame', frame);
    formData.append('frameName', frameName);
    formData.append('frameUrl', frameUrl);
    formData.append('framePath', framePath);
    formData.append('id', id);

    return this.http.put("https://brochill.onrender.com/api/random-image/update", formData, _options)

  }

  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("https://brochill.onrender.com/api/random-image/likes", { id }, _options);
  }

  share(id: any) {
    return this.http.post('https://brochill.onrender.com/api/random-image/share', { id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/random-image/add-comment', { id, comment }, _options)
  }

}
