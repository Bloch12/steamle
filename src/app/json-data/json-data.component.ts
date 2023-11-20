import { Component } from '@angular/core';
import { GameJson } from 'src/models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';

@Component({
  selector: 'app-json-data',
  templateUrl: './json-data.component.html',
  styleUrls: ['./json-data.component.css']
})
export class JsonDataComponent {
  constructor(private games: searchedGamesSercice) { }
  json: GameJson[] = [];
  
  async ngOnInit(){
    this.json = await this.games.getJsonGame();
  }


}
