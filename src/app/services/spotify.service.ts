import { Injectable } from '@angular/core';
import base64url from "base64url";
import {sha256} from "js-sha256";
var arrayBufferToBuffer = require('arraybuffer-to-buffer');

const axios = require("axios");
const qs = require("querystring");

import { SECRETS } from './../../secrets';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  startAuthentication(){
    //First generate the code verifieer    
    const codeVerifier = base64url(Array(64)
    .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
    .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)])
    .join(''));
    //Save code challange in localStorage
    localStorage.setItem("codeVerifier", codeVerifier);
    //Generate the code challange
    const codeChallenge = sha256.arrayBuffer(codeVerifier);
    const bufferedCodeChallenge = arrayBufferToBuffer(codeChallenge);
    const basedCodeChallenge = base64url(bufferedCodeChallenge, "utf8");

    //Custruct authorization url
    const scopes = "user-library-read user-modify-playback-state streaming user-read-email user-read-private";
    let url = "https://accounts.spotify.com/authorize?";
    const parameters = {
      client_id: SECRETS.spotifyClientId,
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
    const codeVerifier = localStorage.getItem("codeVerifier");

    const params = {
      client_id: SECRETS.spotifyClientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:4200/login",
      code_verifier: codeVerifier
    }

    axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(params),
    ).then(response => {
      console.log(response);
      if(response.status === 200){
        localStorage.setItem("accessToken", response.data.access_token);
        window.location.replace("/");
      }else{
        alert("Authentication went wrong");
      }
    });
  }

  async getUserData(){
    const response = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken")}
      }
    );

    console.log(response);
  }
}
