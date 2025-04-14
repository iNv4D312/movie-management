import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-movie',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.scss']
})
export class UploadMovieComponent {
  movie = { title: '', genre: '', description: '' };
  selectedThumbnail: File | null = null;
  selectedVideo: File | null = null;
  uploadSuccess = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'thumbnail') {
        this.selectedThumbnail = file;
    } else if (fileType === 'video_file') {
        this.selectedVideo = file;
    }
  }

  uploadMovie(event: Event) {
    event.preventDefault();

    if (!this.movie.title.trim()) {
      alert('Title is required');
      (document.querySelector('input[name="title"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.movie.genre.trim()) {
      alert('Genre is required');
      (document.querySelector('input[name="genre"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.movie.description.trim()) {
      alert('Description is required');
      (document.querySelector('textarea[name="description"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.selectedThumbnail) {
      alert('Thumbnail is required');
      (document.querySelector('input[name="thumbnail"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.selectedThumbnail.name.toLowerCase().endsWith('.jpg')) {
      alert('Thumbnail must be in JPG format');
      (document.querySelector('input[name="thumbnail"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.selectedVideo) {
      alert('Video file is required');
      (document.querySelector('input[name="video_file"]') as HTMLElement)?.focus();
      return;
    }

    if (!this.selectedVideo.name.toLowerCase().endsWith('.mp4')) {
      alert('Video file must be in MP4 format');
      (document.querySelector('input[name="video_file"]') as HTMLElement)?.focus();
      return;
    }

    const confirmUpload = confirm('Are you sure you want to upload this movie?');
    if (!confirmUpload) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.movie.title);
    formData.append('genre', this.movie.genre);
    formData.append('description', this.movie.description);
    formData.append('thumbnail', this.selectedThumbnail);
    formData.append('video_file', this.selectedVideo);

    this.http.post('http://127.0.0.1:8000/api/movies/', formData)
      .subscribe(response => {
        console.log("Movie uploaded successfully:", response);
        this.uploadSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/']);  // Redirects to homepage
          window.location.reload();  // Forces refresh to show the latest movie list
        }, 2000);
      });
  }
}