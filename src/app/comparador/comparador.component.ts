import { Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameJson } from '../../models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';
import { userService } from '../services/user.service';
import { userData } from 'src/models/user';



@Component({
  selector: 'comparator',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})

export class ComparadorComponent{
    constructor(private searchedGamesService: searchedGamesSercice,private user:userService){}

    http = inject(HttpClient);
    hint: boolean = false;

    public async addGame(search:String | undefined){
        if(!search)
            return;

        if(this.searchedGamesService.searchedGames.find((game: Game) => game.name.toLowerCase() === search.toLowerCase()))
            return;

        const res: GameJson[] = await this.searchedGamesService.getJsonGame();
        const game: GameJson | undefined = res.find((game: any) => game.name.toLowerCase() === search.toLowerCase());
        if(!game){
            alert("No se encontró el juego");
            return;
        }

        this.searchedGamesService.addGame(game.id);
    }

    getSearchedGames(){
        return this.searchedGamesService.searchedGames;
    }

    getRandomGame(){
        return this.searchedGamesService.randomGame;
    }

    getIsWin(){
        return this.searchedGamesService.isWin;
    }
  
    changeHintState(){
        this.hint = !this.hint;
    }
    getUserData():userData{
        return this.user.getUserData();
    }
    getTotalWins():number{
        return this.user.getTotalWins();
    }
}