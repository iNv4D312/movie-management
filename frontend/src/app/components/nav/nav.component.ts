import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isLoggedIn = false;
  username: string | null = null;
  tooltipText: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to isLoggedIn$ observable
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Subscribe to username$ observable
    this.authService.username$.subscribe(name => {
      this.username = name;
    });

    // Handle navigation events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Prevent access to /login and /register if logged in
        if (this.isLoggedIn && (event.url === '/login' || event.url === '/register')) {
          this.router.navigate(['/']);
        }
      }
    });

    // Check login status on initialization
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check login status
  }

  goToEditMovie() {
    if (this.isLoggedIn) {
      this.router.navigate(['/edit-movies']); // Redirect to edit-movie component
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      alert('You must be logged in to manage movies!');
    }
  }

  goToUploadMovie() {
    this.router.navigate(['/upload-movie']);  //Redirects to upload page
  }

  showTooltip(type: string) {
    this.tooltipText = type === 'profile' ? 'View Profile & Manage Movies' : 'Upload a Movie';
  }

  hideTooltip() {
    this.tooltipText = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    alert('Logged out successfully!');
  }
}
