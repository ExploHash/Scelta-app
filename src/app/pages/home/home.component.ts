import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { LibraryService } from '../../services/library.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }
}
