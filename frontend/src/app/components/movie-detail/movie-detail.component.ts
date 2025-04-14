import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any = {};  
  isLoading = true;
  hasError = false; 
  isPlaying: boolean = false;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private movieService: MovieService) {}

  //   const movieId = this.route.snapshot.paramMap.get('id');
  //   this.http.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
  //     .subscribe({
  //       next: (movie: any) => {
  //         console.log('Movie details fetched:', movie);
  //         this.movie = movie;  
  //       },
  //       error: (error) => {
  //         console.error('Error fetching movie details:', error);
  //       }
  //     });
  // } - Test Code 1
  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) {
      console.error('Invalid Movie ID');
      this.hasError = true;
      return;
    } 
    //Perform additional actions
    this.http.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
      .subscribe({
        next: (movie: any) => {
          console.log('Movie details fetched:', movie);
          this.movie = movie;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
          this.hasError = true;
          this.isLoading = false;
        }
      });
      // Fetch Specific Movie using MovieService
      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          console.log('Fetched movie details:', data);
          this.movie = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching movie details:', err);
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  togglePlay() {
    this.isPlaying = true;
    setTimeout(() => {
      document.querySelector('.movie-player-container')?.classList.add('show');
      this.videoPlayer.nativeElement.pause(); 
    }, 100);
  }

  closeVideo() {
    this.isPlaying = false;
    document.querySelector('.movie-player-container')?.classList.remove('show');
  }
}

