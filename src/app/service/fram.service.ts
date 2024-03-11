import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FramService {

  constructor(private http: HttpClient) { }

  uploadFrame(fileName: string, file: File, thumbnail: any, reff: any, language: any, description: any, isActive: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    formData.append('frameName', fileName);
    formData.append('frame', file);
    formData.append("thumbnail", thumbnail);
    formData.append("referenceImage", reff);
    formData.append('language', language);
    formData.append('description', description);
    formData.append('isActive', isActive);

    return this.http.post("https://brochill.onrender.com/api/frames/upload-frame", formData, _options);

  }
  uploadImage(files: File[], id: any, texts: any[]) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    texts.forEach((text: any) => {
      text.text.forEach((tex: string) => {
        formData.append('userText', tex);
      })
    })

    files.forEach(file => {

      formData.append('image', file);
    })
    formData.append('frame_id', id);

    return this.http.post("https://brochill.onrender.com/api/frames/upload-image", formData, _options);

  }

  getFrames() {
    return this.http.get("https://brochill.onrender.com/api/frames/get-frames", { params: { lang: 'hindi' } });
  }

  like(id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'Application/json' }) };

    return this.http.post("https://brochill.onrender.com/api/frame/likes", { frame_id: id }, _options);
  }

  share(frame_id: any) {
    return this.http.post('https://brochill.onrender.com/api/frame/share', { frame_id }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(frame_id: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/frame/add-comment', { frame_id, comment }, _options)
  }

  delete(id: any) {
    return this.http.delete('https://brochill.onrender.com/api/frame/delete/' + id);
  }

  updateFrame(fileName: string, file: File, frame_size: any, coordinates: any, textBox: any[], frameUrl: any, framePath: any, id: any) {

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData;

    formData.append('frameName', fileName);
    formData.append('texts', JSON.stringify(textBox));
    formData.append('frame_size', JSON.stringify(frame_size));
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append('frame', file);
    formData.append('frameUrl', frameUrl);
    formData.append('imagePath', framePath);
    formData.append('id', id);

    return this.http.put("http://localhost:3000/api/frame/update", formData, _options);

  }

  publish(id: any) {
    return this.http.get("http://localhost:3000/api/contestquiz/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("http://localhost:3000/api/contestquiz/draft/" + id);

  }

}
