import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReelsService {

  constructor(private http: HttpClient) { }

  addReel(file: File, description: any, category: any, title: any, language: any, isActive: any) {
    const formData = new FormData();

    console.log(title, description)
    formData.append('reel', file);
    formData.append('title', title);
    formData.append('isActive', isActive);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('language', language);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/reels/upload-reel", formData, _options)

  }

  getReel(id: any) {
    return this.http.get("https://brochill.onrender.com/api/reels/get-reel/" + id);
  }

  getAll() {
    return this.http.get("http://localhost:3000/api/reels/all");
  }


  deleteReel(reelId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.delete('https://brochill.onrender.com/api/reels/delete/' + reelId, _options);
  }

  updateReel(file: any = null, description: any, category: any, title: any, fileUrl: string, language: string, id: any, isActive: any) {
    const formData = new FormData();


    formData.append('reel', file);

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('fileUrl', fileUrl);
    formData.append('language', language);
    formData.append('id', id);
    formData.append('isActive', isActive);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("http://localhost:3000/api/reels/update", formData, _options)

  }


  publish(id: any) {
    return this.http.get("http://localhost:3000/api/reels/publish/" + id);
  }

  draft(id: any) {
    return this.http.get("http://localhost:3000/api/reels/draft/" + id);

  }

}
