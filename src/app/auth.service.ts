import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  
  private isAuthenticatedValue: boolean = false;

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    this.isAuthenticatedValue = !!token;
    return this.isAuthenticatedValue;
  }

  logOut() {
    localStorage.removeItem('token');
    this.isAuthenticatedValue = false;
    this.router.navigate(['/']);
  }
}
