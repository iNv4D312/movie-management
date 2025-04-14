import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true; // Allow access if logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      alert('You must be logged in to access this page!');
      return false;
    }
  }
}