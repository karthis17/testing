import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReelsService {

  constructor(private http: HttpClient) { }

  addReel(file: File, description: any, category: any, hashtags: any[], title: any, defaultTitle: any, defaultDescription: any) {
    const formData = new FormData();

    console.log(title, description)
    formData.append('reel', file);
    formData.append('titleDifLang', JSON.stringify(title));
    formData.append('category', category);
    formData.append('descriptionDifLang', JSON.stringify(description));
    formData.append('title', defaultTitle);
    formData.append('description', defaultDescription);

    hashtags.forEach(h => {
      formData.append('hashtags', h);
    });

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/reels/upload-reel", formData, _options)

  }

  getReel(id: any) {
    return this.http.get("http://localhost:3000/api/reels/get-reel/" + id);
  }

  getAll() {
    return this.http.get("http://localhost:3000/api/reels/get-all");
  }

  like(reelId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('http://localhost:3000/api/reels/like', { reelId }, _options)
  }

  share(reelId: any) {
    return this.http.post('http://localhost:3000/api/reels/share', { reelId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(reelId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/api/reels/add-comment', { reelId, comment }, _options)
  }

  deleteReel(reelId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.delete('http://localhost:3000/api/reels/delete/' + reelId, _options);
  }

  updateReel(file: any = null, description: any, category: any, hashtags: any[], title: any, fileUrl: string, filePath: string, id: any) {
    const formData = new FormData();


    formData.append('new_reel', file);

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('fileUrl', fileUrl);
    formData.append('filePath', filePath);
    formData.append('id', id);

    hashtags.forEach(h => {
      formData.append('hashtags', h);
    });

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("http://localhost:3000/api/reels/update", formData, _options)

  }

  getCategoryWise(categoryId: any) {
    return this.http.get("http://localhost:3000/api/reels/category/" + categoryId);
  }

}
