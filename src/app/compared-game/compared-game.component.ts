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

  compareString(userString: string, systemString: string): string{
    if(userString === systemString)
      return "green";
    
    return "red";
  }
  
}
