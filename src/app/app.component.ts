import { Component } from '@angular/core';
import {addUser,getUser} from '../config/config';
import { searchedGamesSercice } from './services/searchedGames.service';
import { userService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(private userService: userService, private searchedGamesService: searchedGamesSercice){}
  
  async ngOnInit(){
      this.searchedGamesService.getGames();
      await this.searchedGamesService.getRandomGame();
  }
}
