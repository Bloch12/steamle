import { Component } from '@angular/core';
import { GameJson } from 'src/models/game';
import { searchedGamesSercice} from '../services/searchedGames.service';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.component.html',
  styleUrls: ['./game2.component.css']
})
export class Game2Component {
  isGame : boolean = false;
  gameJson! : GameJson[];
  currentGame! : GameJson;
  timer: number= 60;
  constructor(private searchedGames: searchedGamesSercice) { }
  
  
  changeState(){
    this.isGame = !this.isGame;
  }

  async starGame(){
    this.changeState();
    if(!this.gameJson){
      this.gameJson = await this.searchedGames.getJsonGame();
    }
    this.selectGame();
    this.starTimer();
  }

  selectGame(){
      this.currentGame = this.gameJson[Math.floor(Math.random() * this.gameJson.length)];
      console.log(this.currentGame.name);
  } 

  starTimer(){
      this.timer = 60;
      let interval = setInterval(() => {
        if(this.timer > 0){
          this.timer--;
        }else{
          this.changeState();
          clearInterval(interval);
        }
      }, 1000);
  }
 
  ComparedGames(gameName: string | undefined){
    if(this.currentGame.name == gameName)
      this.selectGame();
  }

}