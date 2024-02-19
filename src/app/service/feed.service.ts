import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  addFeed(file: File, description: any, category: any, title: any) {
    const formData = new FormData();

    formData.append('feed', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    return this.http.post("http://localhost:3000/api/feeds/upload-feed", formData, _options)

  }

  getReel(id: any) {
    return this.http.get("http://localhost:3000/api/feeds/get-feed/" + id);
  }

  getAll() {
    return this.http.get("http://localhost:3000/api/feeds/get-all");
  }

  like(feedId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('http://localhost:3000/api/feeds/like', { feedId }, _options)
  }

  share(feedId: any) {
    return this.http.post('http://localhost:3000/api/feeds/share', { feedId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(feedId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('http://localhost:3000/api/feeds/add-comment', { feedId, comment }, _options)
  }

}
