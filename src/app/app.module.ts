import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';

import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [AppComponent, PlayerComponent, PlaylistComponent, MenuComponent, SearchComponent],
  imports: [
    BrowserModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
