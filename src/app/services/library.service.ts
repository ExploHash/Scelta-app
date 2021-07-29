import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private dataService: DataService) {
    dataService.init();
  }

  async createPlayList(name, type){
    
  }
  

}
