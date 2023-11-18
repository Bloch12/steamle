import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';

@Component({
  selector: 'app-compared-game',
  templateUrl: './compared-game.component.html',
  styleUrls: ['./compared-game.component.css']
})


export class ComparedGameComponent implements OnInit {
  @Input() userGame!: Game;
  @Input() systemGame!:Game;
  constructor(private searchedGamesService: searchedGamesSercice){}

  compareNumber(userNumber: number, systemNumber: number): string{
    if(userNumber > systemNumber)
      return "redMin";
    
    if(userNumber < systemNumber)
      return "redMax";
    
    return "green";
  }

  compareString(userString: string, systemString: string[]): string{
    if(systemString.find(name=>name===userString))
      return "green";

    return 'red';
  }

  compareArray(userArray: string[], systemArray: string[]): string{
    let response: string = 'red';
    userArray.sort();
    systemArray.sort();
    if(userArray === systemArray)
      response = 'green';
    else
      systemArray.forEach(systemElement => {
        if(userArray.find(userElement=>userElement===systemElement))
          response = 'orange';
      });
    return response;
  }

  compareDate(userDate: number[], systemDate: number[]): string{
    let response: string = this.compareNumber(userDate[0], systemDate[0]);  
    if(response !== 'green')
      return response;

    response = this.compareNumber(userDate[1], systemDate[1]);  
   
    if(response !== 'green')
      return response;

    return this.compareNumber(userDate[0],systemDate[0]); 
  }

  ngOnInit(): void {
      if(this.userGame.name === this.systemGame.name)
        this.searchedGamesService.setWin();
  }

  showArray(array: string[]): string{
    let response: string = '';
    array.forEach(element => {
      response += '\n' + element ;
    });
    return response;
  }

}
