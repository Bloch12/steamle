import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';
import { MatDialog } from '@angular/material/dialog';
import { userService } from '../services/user.service';
import { ScoreFormComponent } from '../score-form/score-form.component';

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
  constructor(private searchedGames: searchedGamesSercice,  private user: userService, private dialog: MatDialog) { }

  get leaderBoard(): {name: string, score: number}[]{
    return this.user.getGame3Leadboard();
  }


  async startGame() {
    this.score = 0;
    this.currentGame = await this.searchedGames.getARandomGame();
    this.compareGame = await this.searchedGames.getARandomGame();
    this.isGame = true;
  }

  async guessGame(min_equals: boolean){
    if(min_equals === (this.currentGame.rating >= this.compareGame.rating)){
      this.score++;
      this.currentGame = this.compareGame;
      this.compareGame = await this.searchedGames.getARandomGame();
    }
    else{
      this.endGame();
    }
  }

  endGame(){
    this.isGame = false;
    if(this.score > this.user.getGame3Leadboard()[4].score){
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ScoreFormComponent, 
      { data: {score: this.score}, 
        disableClose: true
      });
    
    dialogRef.afterClosed().subscribe(result=> {
      this.user.addAWinGame3(result, this.score);
    });
  }
}
