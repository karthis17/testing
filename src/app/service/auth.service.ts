import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {






  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  reg(user: any) {
    return this.http.post('https://brochill.onrender.com/api/admin/signup', user, this._options)
  }
  login(user: any) {
    return this.http.post('https://brochill.onrender.com/api/admin/login', user, this._options)
  }
  getUser() {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.get('https://brochill.onrender.com/api/users/me', _options);
  }






}
