import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  movieService = inject(MovieService); 
  movies: any[] = [];
  movie: any;
  pic: any;
  showHomeSection = true;
  selectedMovie: any = null;
  isScrolled = false;
  isNavbarVisible = false;
  isLoggedIn: boolean = false;

  @ViewChild('trendingSection', { static: false }) trendingSection!: ElementRef;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Detect scrolling
  }

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHomeSection = event.url === '/';  
      }
    });

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.checkLoginStatus(); // Check login status on initialization
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any[]) => {
      console.log('Movies fetched:', data);
      this.movies = data;
    });
  }

  scrollLeft() {
    console.log("Scrolling left..")
    this.trendingSection.nativeElement.querySelector('.trending-grid')
    .scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    console.log("Scrolling right..")
    this.trendingSection.nativeElement.querySelector('.trending-grid')
    .scrollBy({ left: 300, behavior: 'smooth' });
  }

  openMoviePopup(movie: any) {
    this.selectedMovie = movie;
    setTimeout(() => {
      document.querySelector('.movie-popup')?.classList.add('show');
    }, 50); 
  }
  
  closeMoviePopup() {
    document.querySelector('.movie-popup')?.classList.remove('remove');
    setTimeout(() => {
      this.selectedMovie = null;
    }, 300);
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if a token exists
  }

  startWatching() {
    if (this.isLoggedIn) {
      this.router.navigate(['/movies']);  // Go to movies if logged in
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
      alert('You must be logged in to start watching!'); // Notify user
    }
  }
}