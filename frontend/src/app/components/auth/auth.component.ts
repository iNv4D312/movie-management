import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Removed unused NgModule import

@Component({
  selector: 'app-login',
  standalone: true,  // Standalone Component
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     this.authService.login(this.username, this.password).subscribe(response => {
//       localStorage.setItem('token', response.token); // Store token
//       this.router.navigate(['/movies']); // Redirect to movies
//     }, error => {
//       alert('Invalid credentials');
//     });
//   } - Deprecated

login() {
    this.authService.login(this.username, this.password).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/movies']); // Redirect to movies
      }),
      catchError(_ => {
        alert('Invalid credentials'); // Handle login errors
        return throwError(() => new Error('Invalid credentials')); // Correct syntax
      })
    ).subscribe();
}
}