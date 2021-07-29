import { LibraryEntiteitBase } from "./LibraryEntiteitBase";

export class Playlist extends LibraryEntiteitBase {
  constructor (
    name: string,
    type: string,
    parentUuid: string
  ) {
    super(name, type, parentUuid);
  }

  save(){
    
  }
}