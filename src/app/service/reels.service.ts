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
    return this.http.get("https://brochill.onrender.com/api/reels/get-all");
  }

  like(reelId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('https://brochill.onrender.com/api/reels/like', { reelId }, _options)
  }

  share(reelId: any) {
    return this.http.post('https://brochill.onrender.com/api/reels/share', { reelId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(reelId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/reels/add-comment', { reelId, comment }, _options)
  }

  deleteReel(reelId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.delete('https://brochill.onrender.com/api/reels/delete/' + reelId, _options);
  }

  updateReel(file: any = null, description: any, category: any, title: any, fileUrl: string, filePath: string, id: any) {
    const formData = new FormData();


    formData.append('new_reel', file);

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('fileUrl', fileUrl);
    formData.append('filePath', filePath);
    formData.append('id', id);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/reels/update", formData, _options)

  }

  getCategoryWise(categoryId: any) {
    return this.http.get("https://brochill.onrender.com/api/reels/category/" + categoryId);
  }

}
