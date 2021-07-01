import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import base64url from "base64url";
import shajs from "sha.js";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { }



  startAuthentication(){
    //First generate the code verifieer    

    const codeVerifier = Array(128)
    .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
    .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)])
    .join('');
    //Save code challange in localStorage
    localStorage.setItem("codeVerifier", codeVerifier);

    //Generate the code challange
    const codeChallenge = shajs('sha256').update(codeVerifier).digest('utf8');
    const basedCodeChallenge = base64url(codeChallenge, "utf8");


    //Custruct authorization url
    const clientId = "a";
    const scopes = "user-library-read user-modify-playback-state streaming user-read-email user-read-private";
    let url = "https://accounts.spotify.com/authorize?";
    const parameters = {
      client_id: clientId,
      response_type: "code",
      redirect_uri: encodeURIComponent("http://localhost:4200/login"),
      code_challenge_method: "S256",
      code_challenge: basedCodeChallenge,
      scope: encodeURIComponent(scopes)
    }
    //Remap paramters to get parameter url
    url += Object.entries(parameters).map(([key, value]) => `${key}=${value}`).join("&");

    //Redirect user
    window.location.replace(url);
  }

  finishAuthentication(code){
    const clientId = "a";
    const codeVerifier = localStorage.getItem("codeVerifier");

    const params = {
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:4200/login",
      code_verifier: codeVerifier
    }

    const payload = new HttpParams({fromObject: params});

    let res = this.http.post("https://accounts.spotify.com/api/token", payload).subscribe(data => {
      console.log(data);
    })
  }
}
