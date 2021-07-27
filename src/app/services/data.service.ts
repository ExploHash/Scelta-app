import { Injectable } from '@angular/core';
const databaseVersion = 1;

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public db;

  constructor() {}

  public init(){
    const request = indexedDB.open("scelta", databaseVersion);

    request.onerror = (event) => {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    request.onsuccess = (event) => {
      this.db = request.result;
      this.db.onerror = this.onError.bind(this);
    };

    request.onupgradeneeded = this.onUpgradeNeeded.bind(this);
  }

  public onError(event){
    console.log("error", event);
  }

  public onUpgradeNeeded(event){
    const db = event.target.result;
    //Create library table
    const libraryStore = db.createObjectStore("library", { keyPath: "uuid" });
    libraryStore.createIndex("parentUuid", "parentUuid", { unique: false });
    libraryStore.createIndex("type", "type", { unique: false });

    //Create songs table
    const spotifySongLibrary = db.createObjectStore("spotifySongLibrary", { keyPath: "id" });
    spotifySongLibrary.createIndex("albumName", "album.name", {unique: false});

    //Create cached artists table
    db.createObjectStore("cachedArtists", { keyPath: "id" });
  }
}