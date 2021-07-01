import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.has("code")){
      //Finish authentication
      let code = this.route.snapshot.queryParamMap.get("code")
      this.spotifyService.finishAuthentication(code);
    }
  }

}
