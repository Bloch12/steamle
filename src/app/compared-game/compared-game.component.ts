import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-compared-game',
  templateUrl: './compared-game.component.html',
  styleUrls: ['./compared-game.component.css']
})


export class ComparedGameComponent {
  @Input() userGame!: Game;
  @Input() systemGame!:Game;

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

  compareDate(userDate: number[], systemDate: number[]): string{
    let response: string = this.compareNumber(userDate[0], systemDate[0]);  
    if(response !== 'green')
      return response;

    response = this.compareNumber(userDate[1], systemDate[1]);  
   
    if(response !== 'green')
      return response;

    return this.compareNumber(userDate[0],systemDate[0]); 
  }





}
