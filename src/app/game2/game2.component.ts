import { Component } from '@angular/core';
import { GameJson } from 'src/models/game';
import { searchedGamesSercice} from '../services/searchedGames.service';
import { userService } from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { ScoreFormComponent } from '../score-form/score-form.component';
import { LoseSingComponent } from '../lose-sing/lose-sing.component';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.component.html',
  styleUrls: ['./game2.component.css']
})
export class Game2Component {
  isGame : boolean = false;
  gameJson! : GameJson[];
  currentGame! : GameJson;
  timer: number= 100;
  score: number = 0;
  combo: number = 0;
  color: string = "white";
  constructor(private searchedGames: searchedGamesSercice, private user: userService, private dialog: MatDialog) { }
  
  
  changeState(){
    this.isGame = !this.isGame;
  }

  async starGame(){
    this.changeState();
    this.score = 0;
    this.combo = 0;
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
      this.timer = 100;
      let interval = setInterval(() => {
        if(this.timer > 0){
          this.timer--;
        }else{
          clearInterval(interval);
          this.endGame();
        }
      }, 1000);
  }
 
  ComparedGames(gameName: string | undefined){
    if(this.currentGame.name == gameName){
      this.changeColor("green");
      this.guessGame();
    }else{
      this.combo = 0;
      this.changeColor("red");
    }
  }

  guessGame(){
    this.score+=100 + (this.combo * 50);
    this.combo++;
    this.selectGame();
  }

  chengeGame(){
    this.combo = 0;
    this.selectGame();
  }

  getLeaderboardGame2(): {name: string, score: number}[]{
      return this.user.getGame2Leadboard();
  }

  endGame(){
    if(this.score > this.user.getUserData().game2.Leadboararray[4].score){
      this.openDialog();
    }else{
      this.openDialog2();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ScoreFormComponent, 
      { data: {score: this.score}, 
        disableClose: true
      });
    
    dialogRef.afterClosed().subscribe(result=> {
      this.user.addAWinGame2(result, this.score);
      this.changeState();
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(LoseSingComponent, 
      { data: {score: this.score}});
    
    dialogRef.afterClosed().subscribe(result=> {
      this.isGame = false;
      this.changeState();
    });
  }

  changeColor(color: string){
    this.color = color;
    let interval = setInterval(() => {
      this.color = "white";
      clearInterval(interval);
    }, 1000);
  }


  


}