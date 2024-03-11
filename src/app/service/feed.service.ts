import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  addFeed(file: File, isActive: any, description: any, category: any, title: any, language: any) {
    const formData = new FormData();

    formData.append('feed', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append("language", language);
    formData.append("isActive", isActive);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("https://brochill.onrender.com/api/feeds/upload-feed", formData, _options)

  }

  getReel(id: any) {
    return this.http.get("https://brochill.onrender.com/api/feeds/get-feed/" + id);
  }

  getAll() {
    return this.http.get("https://brochill.onrender.com/api/feeds/get-all", { params: { lang: "hindi" } });
  }

  like(feedId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('https://brochill.onrender.com/api/feeds/like', { feedId }, _options)
  }

  share(feedId: any) {
    return this.http.post('https://brochill.onrender.com/api/feeds/share', { feedId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(feedId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('https://brochill.onrender.com/api/feeds/add-comment', { feedId, comment }, _options)
  }

  deleteFeed(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.delete('https://brochill.onrender.com/api/feeds/delete/' + id, _options);
  }

  updateFeed(file: any = null, description: any, category: any, title: any, imageUrl: string, imagePath: string, id: any) {
    const formData = new FormData();


    formData.append('new_feed', file);

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);
    formData.append('imagePath', imagePath);
    formData.append('id', id);


    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.put("https://brochill.onrender.com/api/feeds/update", formData, _options)

  }

  getCategoryWise(categoryId: any) {
    return this.http.get("https://brochill.onrender.com/api/feeds/category/" + categoryId);
  }


}
