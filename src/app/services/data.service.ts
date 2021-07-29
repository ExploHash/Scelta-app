import { Injectable } from '@angular/core';
const databaseVersion = 1;
const databaseName = "scelta";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public db;

  constructor() {}

  public init(){
    const request = indexedDB.open(databaseName, databaseVersion);

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

  public async insert(objectStoreName, object){
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([objectStoreName], "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);

      transaction.onError = (event) => {
        rej(event);
      }

      transaction.oncomplete = (event) => {
        res(event);
      }

      objectStore.add(object);
    });
  }

  
}