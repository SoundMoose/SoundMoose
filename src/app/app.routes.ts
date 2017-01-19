import { Routes, RouterModule } from '@angular/router';
import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ThreeDComponent } from './components/three-d/three-d.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { UserComponent } from './components/user/user.component';
import { GamePlayerComponent } from './components/game/game-player/game-player.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: TopTracksComponent },
  { path: 'top_tracks/:genre', component: TopTracksComponent },
  { path: 'track/:platform/:trackId', component: TrackDetailComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: 'threeD', component: ThreeDComponent },
  { path: 'user', component: UserComponent},
  { path: 'game/:platform/:trackId/:start/:end/:hostId', component: GamePlayerComponent },
  { path: '**', redirectTo: 'home'}

];
