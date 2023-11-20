import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';
import { MatDialog } from '@angular/material/dialog';
import { userService } from '../services/user.service';
import { ScoreFormComponent } from '../score-form/score-form.component';
import { LoseSingComponent } from '../lose-sing/lose-sing.component';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.component.html',
  styleUrls: ['./game3.component.css']
})

export class Game3Component {
  isGame: boolean = false;
  score: number = 0;
  currentGame!: Game;
  compareGame!: Game;
  showScore: boolean = false;
  constructor(private searchedGames: searchedGamesSercice,  private user: userService, private dialog: MatDialog) { }

  get leaderBoard(): {name: string, score: number}[]{
    return this.user.getGame3Leadboard();
  }


  async startGame() {
    this.showScore = false;
    this.score = 0;
    this.currentGame = await this.searchedGames.getARandomGame();
    if(!this.currentGame.rating){
      this.currentGame.rating = 0;
    }
    this.compareGame = await this.searchedGames.getARandomGame();
    this.isGame = true;
  }

  async guessGame(min_equals: boolean){
    if(min_equals === (this.currentGame.rating < this.compareGame.rating) || this.currentGame.rating === this.compareGame.rating){
        this.score++;
        this.currentGame = this.compareGame;
        if(!this.currentGame.rating){
          this.currentGame.rating = 0;
      }
      this.compareGame = await this.searchedGames.getARandomGame();
    }
    else{
      this.endGame();
    }
  }

  endGame(){
    this.showScore = true;
    if(this.score > this.user.getGame3Leadboard()[4].score){
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
      this.user.addAWinGame3(result, this.score);
      this.isGame = false;
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(LoseSingComponent, 
      { data: {score: this.score}});
    
    dialogRef.afterClosed().subscribe(result=> {
      this.isGame = false;
    });
  }
}
