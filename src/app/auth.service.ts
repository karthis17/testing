import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  private isAuthenticatedValue: boolean = false;

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    this.isAuthenticatedValue = !!token;
    return this.isAuthenticatedValue;
  }
}
