import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { ArtistComponent } from './artist/artist.component';
import { HeaderComponent } from './header/header.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultEntryComponent } from './result-entry/result-entry.component';
import { HomeTopArtistsComponent } from './home-top-artists/home-top-artists.component';
import { AboutComponent } from './about/about.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImagePreloadDirective } from './image-preload.directive';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoComponent } from './video/video.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { ArtistGridComponent } from './artist-grid/artist-grid.component';
import { WireframesComponent } from './wireframes/wireframes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    ArtistComponent,
    HeaderComponent,
    ArtistListComponent,
    ArtistCardComponent,
    SearchComponent,
    FavoritesComponent,
    ResultEntryComponent,
    HomeTopArtistsComponent,
    AboutComponent,
    ImagePreloadDirective,

    VideoPlayerComponent,

    VideoCardComponent,

    VideoListComponent,

    VideoComponent,

    VideoGridComponent,

    ArtistGridComponent,

    WireframesComponent,
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
