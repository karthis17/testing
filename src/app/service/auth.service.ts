import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {






  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  reg(user: any) {
    return this.http.post('http://localhost:3000/api/users/signup', user, this._options)
  }
  login(user: any) {
    return this.http.post('http://localhost:3000/api/users/login', user, this._options)
  }
  getUser() {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.get('http://localhost:3000/api/users/me', _options);
  }






}
