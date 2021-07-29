import { uuid } from 'uuidv4';
import { DataService } from "../services/data.service";

export abstract class LibraryEntiteitBase {
  uuid: string;
  
  constructor(
    name: string,
    type: string,
    parentUuid: string
  ){
    this.uuid = uuid();
  }

  save(){
    await DataService.insert();
    console.log("hallo")
  }
}