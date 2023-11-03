import { Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameJson } from '../../models/game';
import { searchedGamesSercice } from '../services/searchedGames.service';



@Component({
  selector: 'comparator',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})

export class ComparadorComponent{
    constructor(private searchedGamesService: searchedGamesSercice){}

    http = inject(HttpClient);
    hint: boolean = false;

    public addGame(search:String | undefined){
        if(!search)
            return;

        if(this.searchedGamesService.searchedGames.find((game: Game) => game.name.toLowerCase() === search.toLowerCase()))
            return;

        this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
            const games:GameJson[] = res;
            const game: GameJson | undefined = games.find((game: any) => game.name.toLowerCase() === search.toLowerCase());
            
            if(!game){
                alert("No se encontró el juego");
                return;
            }
            
            this.searchedGamesService.addGame(game.id);
      });
    }

    getSearchedGames(){
        return this.searchedGamesService.searchedGames;
    }

    getRandomGame(){
        return this.searchedGamesService.randomGame;
    }
  
    setHintTrue(){
        this.hint = true;
    }
}