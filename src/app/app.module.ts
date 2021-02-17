import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { TaigaModule } from './taiga.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExploreComponent } from './explore/explore.component';

import { SanitizeHtmlPipe } from './shared/pipes/sanitize-html.pipe';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ExploreComponent,
    SanitizeHtmlPipe,
    PortfolioComponent,
    LeaguesComponent,
    FavoriteComponent,
    SettingsComponent,
    HomeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TaigaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
