import { RouterOutlet, RouterModule } from '@angular/router';
import { Component, inject, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MovieService } from './services/movie.service';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Ensure it's standalone
  imports: [CommonModule, RouterModule, NavComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-management-frontend';
  // movieService = inject(MovieService); 
  // movies: any[] = [];
  // movie: any;
  // pic: any;
  // showHomeSection = true;
  // selectedMovie: any = null;
  // isScrolled = false;
  // isNavbarVisible = false;
  
  // @ViewChild('trendingSection', { static: false }) trendingSection!: ElementRef;

  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 50; // Detect scrolling
  // }

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.showHomeSection = event.url === '/';  
  //     }
  //   });
  // }

  // ngOnInit() {
  //   this.movieService.getMovies().subscribe((data: any[]) => {
  //     console.log('Movies fetched:', data);
  //     this.movies = data;
  //   });

    
  // }

  // scrollLeft() {
  //   console.log("Scrolling left..")
  //   this.trendingSection.nativeElement.querySelector('.trending-grid')
  //   .scrollBy({ left: -300, behavior: 'smooth' });
  // }

  // scrollRight() {
  //   console.log("Scrolling right..")
  //   this.trendingSection.nativeElement.querySelector('.trending-grid')
  //   .scrollBy({ left: 300, behavior: 'smooth' });
  // }

  // openMoviePopup(movie: any) {
  //   this.selectedMovie = movie;
  //   setTimeout(() => {
  //     document.querySelector('.movie-popup')?.classList.add('show');
  //   }, 50); 
  // }
  
  // closeMoviePopup() {
  //   document.querySelector('.movie-popup')?.classList.remove('remove');
  //   setTimeout(() => {
  //     this.selectedMovie = null;
  //   }, 300);
  // }

  // showNavbar() {
  //   this.isNavbarVisible = true;
  //   document.querySelector('.navbar')?.classList.add('show');
  // }

  // autoHideNavbar() {
  //   setTimeout(() => {
  //     this.isNavbarVisible = false;
  //     document.querySelector('.navbar')?.classList.remove('show');
  //   }, 3000); //  Hides after 3 seconds
  // }
}