import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import {YouTubePlayerModule} from '@angular/youtube-player';
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
    ResultEntryComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
