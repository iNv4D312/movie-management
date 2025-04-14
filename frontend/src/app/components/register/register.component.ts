import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,  // Standalone Component
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    showHomeSection: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.showHomeSection = event.url === '/';
            }
        });
    }

    register() {
        if (!this.username || !this.email || !this.password) {
            alert('All fields are required!');
            return;
        }

        this.authService.register(this.username, this.email, this.password).subscribe({
            next: () => {
                alert('Registration successful! Please log in.');
                this.clearForm();
                this.router.navigate(['/login']); // Navigate to the login page
            },
            error: (error) => {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again later.');
            }
        });
    }

    private clearForm() {
        this.username = '';
        this.email = '';
        this.password = '';
    }
}