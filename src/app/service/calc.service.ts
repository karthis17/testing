import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  addLove(text: string[], min: any, max: any, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);

    formData.append('maxPercentage', max);

    return this.http.post("http://localhost:3000/api/love-friendship-calc/add-love-quotes", formData);

  }

  addFriend(text: string[], min: any, max: any, file: File) {

    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);

    formData.append('maxPercentage', max);

    return this.http.post("http://localhost:3000/api/love-friendship-calc/add-love-quotes", formData);

  }

  calLove(name1: any, name2: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/api/love-friendship-calc/love-calculate", { name1, name2 }, _options)
  }

  calcFriendship(name1: string, name2: string) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/api/love-friendship-calc/friend-calculate", { name1, name2 }, _options)
  }

}
