import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string; username: string }>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);  // Store token
        localStorage.setItem('username', response.username);  // Store username
        this.isLoggedInSubject.next(true); // Updates login state dynamically
        this.usernameSubject.next(response.username); // Updates username dynamically
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null; // Checks if user is logged in
  }

  logout() {
    localStorage.removeItem('token'); // Clears session
    localStorage.removeItem('username'); // Clears username
    this.isLoggedInSubject.next(false); // Updates logout state dynamically
    this.usernameSubject.next(null); // Clears username state
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register/`, { username, email, password });
  }
}