import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArtistComponent } from './artist/artist.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { WireframesComponent } from './wireframes/wireframes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'wireframes', component: WireframesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
