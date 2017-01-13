import { Routes, RouterModule } from '@angular/router';
import { TopTracksComponent } from './components/top-tracks/top-tracks.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { SearchComponent } from './components/search/search.component';
import { ThreeDComponent } from './components/threeD/three-d.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: TopTracksComponent },
  { path: 'top_tracks/:genre', component: TopTracksComponent },
  { path: 'track/:trackId', component: TrackDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'threeD', component: ThreeDComponent },
  { path: '**', redirectTo: 'home'}
];
