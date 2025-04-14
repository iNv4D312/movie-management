import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-movie-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-movie-modal.component.html',
  styleUrls: ['./edit-movie-modal.component.scss']
})
export class EditMovieModalComponent {
  showSuccess = false; // Tracks success popup visibility

  @Input() movie: any; // Receive movie data
  @Output() closeModal = new EventEmitter<void>(); // Emit event when closing

  selectedThumbnail: File | null = null;
  selectedVideo: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'thumbnail') {
      this.selectedThumbnail = file;
    } else if (fileType === 'video_file') {
      this.selectedVideo = file;
    }
  }

  saveChanges() {
    const formData = new FormData();
    formData.append('title', this.movie.title);
    formData.append('genre', this.movie.genre);
    formData.append('description', this.movie.description);

    if (this.selectedThumbnail) {
      formData.append('thumbnail', this.selectedThumbnail);
    } else if (this.movie.thumbnail) {
      formData.append('thumbnail', this.movie.thumbnail);
    }

    if (this.selectedVideo) {
      formData.append('video_file', this.selectedVideo);
    } else if (this.movie.video_file) {
      formData.append('video_file', this.movie.video_file);
    }

    this.http.put(`http://127.0.0.1:8000/api/movies/${this.movie.id}/update/`, formData)
      .subscribe({
        next: (response) => {
          console.log("Updated successfully:", response); // Debugging log
          this.showSuccess = true; // Show success popup
          setTimeout(() => {
            this.showSuccess = false; // Hide after 2 seconds
            this.closeModal.emit(); // Close modal after success
            console.log("Success popup closed!"); // Debugging log
          }, 2000);
        },
        error: (error) => {
          console.error("Error updating movie:", error); // Handle error
        }
      });
  }
}