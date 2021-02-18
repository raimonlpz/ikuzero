import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'hello', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'leagues', component: LeaguesComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', component: HomeComponent }
  // { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  // { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canLoad: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
