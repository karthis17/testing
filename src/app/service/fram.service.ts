import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FramService {

  constructor(private http: HttpClient) { }

  uploadFrame(fileName: string, file: File, frame_size: any, coordinates: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    formData.append('frameName', fileName);
    formData.append('frameW', frame_size.width);
    formData.append('frameH', frame_size.height);
    formData.append('x', coordinates.x);
    formData.append('y', coordinates.y);
    formData.append('coordinateW', coordinates.width);
    formData.append('coordinateH', coordinates.height);
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

  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("http://localhost:3000/api/frame/likes", { frame_id: id }, _options);
  }

  share(frame_id: any) {
    return this.http.post('http://localhost:3000/api/frame/share', { frame_id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(frame_id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/api/frame/add-comment', { frame_id, comment }, _options)
  }

}
