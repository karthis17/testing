import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }
  _options = { headers: new HttpHeaders({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjMGRiYWQ1MTg3Njk3YzU1NzlmYzJiIn0sImlhdCI6MTcwNzIxMDYzMywiZXhwIjoxNzA5ODAyNjMzfQ.RxR378VR48w89feaMmpRoU_n5zcRfT3YxzknurvWWCk" }) };

  getUsers() {
    return this.http.get('http://localhost:3000/api/users/me', this._options)
  }
  uploadImage(file: File, description: string, category: any, sub_category: any) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('sub_category', sub_category);

    return this.http.post('http://localhost:3000/api/img/upload', formData, this._options);
  }

  getPost(category: any = null, sub_category: any = null) {
    return this.http.get('http://localhost:3000/api/img/get-post', { params: { category, sub_category } });
  }
}
