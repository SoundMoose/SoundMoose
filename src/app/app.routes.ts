import { Routes, RouterModule } from '@angular/router';
import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { SearchComponent } from './components/search/search.component';
import { ThreeDComponent } from './components/threeD/three-d.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { UserComponent } from './components/user/user.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: TopTracksComponent },
  { path: 'top_tracks/:genre', component: TopTracksComponent },
  { path: 'track/:platform/:trackId', component: TrackDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'threeD', component: ThreeDComponent },
  { path: 'user', component: UserComponent},
  { path: '**', redirectTo: 'home'}
];
