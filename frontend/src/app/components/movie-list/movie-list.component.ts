// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-movie-list',
//   imports: [],
//   templateUrl: './movie-list.component.html',
//   styleUrl: './movie-list.component.scss'
// })
// export class MovieListComponent {

// } -- Original code

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-movie-list',
//   templateUrl: './movie-list.component.html'
// })
// export class MovieListComponent implements OnInit {
//   movies: any[] = [];

//   constructor(private movieService: MovieService) {}

//   ngOnInit() {
//     this.movieService.getMovies().subscribe((data: any[]) => {
//       console.log('Movies fetched:', data);  // debug line
//       this.movies = data;
//     });
//   }
// } - Test Code 1


@Component({
  selector: 'app-movie-list',
  standalone: true,  // Standalone Component
  imports: [CommonModule, FormsModule],  
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent {
  // Movie list logic
  searchQuery = "";
  movies: any[] = [];
  editingMovie: any | null = null;
  movieService = inject(MovieService); 
  http = inject(HttpClient);
  router = inject(Router);  // Injecting Router for navigation
  authService = inject(AuthService) // For Authentication

  //constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any[]) => {
      console.log('Movies fetched:', data);
      this.movies = data;
    });
  }

  editMovie(movie: any) {
    this.editingMovie = { ...movie };  
  }
  
  updateMovie() {
    if (!this.editingMovie) return;  // Ensure editingMovie is not null

    //console.log('Updating movie:', this.editingMovie); 

    const updatedMovie = {
      title: this.editingMovie.title,
      description: this.editingMovie.description
    };  // Create a new object with updated values

    console.log('Updated movie data:', updatedMovie);
    
    this.http.patch(`http://127.0.0.1:8000/api/movies/${this.editingMovie.id}/`, updatedMovie)
    .subscribe({
      next: (response) => {
        console.log('Movie Updated:', response);
        //this.refreshMovies();  // Refresh the movie list after update
        this.movies = this.movies.map(movie => 
          movie.id === this.editingMovie.id ? { ...movie, ...updatedMovie } : movie
        );

        this.editingMovie = null;
      }, error: (error) => console.error('Update failed:', error),
      complete: () => console.log('Update process completed')
    });
  }

  refreshMovies() {
    this.movieService.getMovies().subscribe((data: any[]) => {
      this.movies = data;
    });
  }  

  cancelEdit() {
    this.editingMovie = null;  // Reset the editing movie
  }

  deleteMovie(movieId: number) {
    this.http.delete(`http://127.0.0.1:8000/api/movies/${movieId}/`)
      .subscribe({
        next: () => {
          console.log(`Movie with ID ${movieId} deleted.`);
          this.movies = this.movies.filter(movie => movie.id !== movieId);
        },
        error: (error) => console.error('Delete failed:', error)
      });
  }

  viewMovie(movie: any) {
    this.router.navigate(['/movie', movie.id]);  
  }

  handlePlay(movie: any) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/movie', movie.id]); // If logged in, navigate to movie
    } else {
      this.router.navigate(['/login']); // If guest, redirect to login
    }
  }
}
