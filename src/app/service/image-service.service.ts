import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }


  getUsers() {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };



    return this.http.get('http://localhost:3000/api/users/me', _options)
  }
  uploadImage(file: any, description: string, category: any, sub_category: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('sub_category', sub_category);

    return this.http.post('http://localhost:3000/api/img/upload', formData, _options);
  }

  getPost(category: any = null, sub_category: any = null) {
    return this.http.get('http://localhost:3000/api/img/get-post', { params: { category, sub_category } });
  }

  like(postId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('http://localhost:3000/api/img/likes', { postId }, _options)
  }

  follow(following_id: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('http://localhost:3000/api/img/follow', { following_id }, _options)
  }

  up(file: any, state1: any[], state2: any[], state3: any[]) {
    console.log(file, state1, state2, state3);
    const formData = new FormData();

    formData.append('question', file);

    state1.forEach((stateFile, index) => {
      formData.append(`images`, stateFile);
    });

    state2.forEach((stateFile, index) => {
      formData.append(`state_2`, stateFile);
    });

    state3.forEach((stateFile, index) => {
      formData.append(`state_3`, stateFile);
    });
    formData.forEach((stateFile) => {
      console.log(stateFile);
    });

    return this.http.post('http://localhost:3000/img/upload', formData);
  }

}
