import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { EditMovieComponent } from './components/edit/edit-movie.component';
import { EditMovieModalComponent } from './components/edit/popup/edit-movie-modal.component';
import { UploadMovieComponent } from './components/upload/upload-movie.component';
import { AuthGuard } from './guards/auth.guard';

// export const routes: Routes = [];

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: AuthComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },//Protected,
  { path: 'edit-movies', component: EditMovieComponent, canActivate: [AuthGuard] },//Protected,
  { path: 'edit-movie/:id', component: EditMovieModalComponent, canActivate: [AuthGuard] },//Protected
  { path: 'upload-movie', component: UploadMovieComponent, canActivate: [AuthGuard] }, //Protected

];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


