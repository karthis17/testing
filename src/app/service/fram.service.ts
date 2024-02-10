import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FramService {

  constructor(private http: HttpClient) { }

  uploadFrame(fileName: string, file: File) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    formData.append('frameName', fileName);
    formData.append('frame', file);

    return this.http.post("http://localhost:3000/api/frame/upload-frame", formData, _options);

  }
  uploadImage(file: File, id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    formData.append('image', file);
    formData.append('frame_id', id);

    return this.http.post("http://localhost:3000/api/frame/upload-image", formData, _options);

  }

  getFrames() {
    return this.http.get("http://localhost:3000/api/frame/get-frames");
  }

}
