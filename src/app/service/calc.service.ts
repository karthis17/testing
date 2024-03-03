import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  addLove(text: string[], min: any, max: any, file: File | string) {
    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);

    formData.append('maxPercentage', max);
    console.log(formData.get('image'));

    return this.http.post("/api/love-friendship-calc/add-love-quotes", formData);

  }

  addFriend(text: string[], min: any, max: any, file: File | string) {

    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);

    formData.append('maxPercentage', max);

    return this.http.post("/api/love-friendship-calc/add-friend-quotes", formData);

  }

  calLove(name1: any, name2: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("/api/love-friendship-calc/love-calculate", { name1, name2 }, _options)
  }

  calcFriendship(name1: string, name2: string) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post("/api/love-friendship-calc/friend-calculate", { name1, name2 }, _options)
  }

  deleteFriendCalc(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('/api/love-friendship-calc/friendCalc/delete/' + id, _options);
  }

  deleteLoveCalc(id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.delete('/api/love-friendship-calc/loveCalc/delete/' + id, _options);
  }

  getLoveCalc() {
    return this.http.get('/api/love-friendship-calc/loveCalc/get-all')
  }
  getFriendCalc() {
    return this.http.get('/api/love-friendship-calc/friendCalc/get-all')
  }

  updateFriendCalc(text: string[], min: any, max: any, file: any, filePath: any, id: any) {
    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);
    formData.append('id', id);
    formData.append('maxPercentage', max);
    formData.append('filePath', filePath);

    return this.http.put("/api/love-friendship-calc/friendCalc/update", formData);

  }

  updateLoveCalc(text: string[], min: any, max: any, file: any, filePath: any, id: any) {
    const formData = new FormData();
    formData.append('image', file);
    text.forEach(text => {
      formData.append('text', text);
    });
    formData.append('minPercentage', min);
    formData.append('id', id);
    formData.append('maxPercentage', max);
    formData.append('filePath', filePath);

    return this.http.put("/api/love-friendship-calc/loveCalc/update", formData);

  }

}
