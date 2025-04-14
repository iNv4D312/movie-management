import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditMovieModalComponent } from './popup/edit-movie-modal.component';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, EditMovieModalComponent],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  movies: any[] = [];  
  selectedMovie: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchMovies(); // Load movies on component startup
  }

  fetchMovies() {
    this.http.get('http://127.0.0.1:8000/api/movies/')
      .subscribe((response: any) => {
        console.log(response); // Inspect API response in console
        this.movies = response; // Assign response directly (it's an array!)
      });
  }

  editMovie(movie: any) {
    this.selectedMovie = movie;  // Open modal with selected movie
  }

  closeModal() {
    this.selectedMovie = null;  // Close modal
  }


  deleteMovie(movieId: number) {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.http.delete(`http://127.0.0.1:8000/api/movies/${movieId}/delete/`)
        .subscribe(() => {
          this.movies = this.movies.filter(movie => movie.id !== movieId); // Remove from UI instantly
          alert('Movie deleted successfully!');
        });
    }
  }
}
