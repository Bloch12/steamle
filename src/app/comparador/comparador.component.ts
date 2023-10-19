import { Component,OnInit, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameJson } from '../../models/game';



@Component({
  selector: 'comparator',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})

export class ComparadorComponent implements OnInit {
    randomGame!: Game;
    searchedGames: Game[] = [];
    http = inject(HttpClient);
    hint: boolean = false;

    public addGame(search:String | undefined){
        
        if(!search)
            return;

        if(this.searchedGames.find((game: Game) => game.name.toLowerCase() === search.toLowerCase()))
            return;

        this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
            const games:GameJson[] = res;
            const game: GameJson | undefined = games.find((game: any) => game.name.toLowerCase() === search.toLowerCase());
            
            if(!game){
                alert("No se encontró el juego");
                return;
            }
            
            const url: string = "https://api.rawg.io/api/games/" + game.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
            this.http.get(url).subscribe(async (res: any) => {
               this.searchedGames.push(this.loadGame(res));
            });
      });
      console.log(this.searchedGames);
    }
  
    textToDate(texto: string): number[] {
        let fechaS: string[] = texto.split("-");
        let fecha: number[] = [];
        for(let i:number = 0; i < fechaS.length; i++){
          if(isNaN(parseInt(fechaS[i])))
            return fecha;
          fecha.push(parseInt(fechaS[i]));
        }
        return fecha;
    }
    
    loadGame(res: any): Game{
        let game: Game = {
          name: res.name as string,
          rating: res.metacritic as number,
          genres:[],
          tags:[],
          developers:[],
          relased: this.textToDate(res.released), 
          description: res.description_raw as string,
          image: res.background_image as string
        }
        res.genres.forEach((genre: any) => {
            game.genres.push(genre.name);
        });

        res.tags.forEach((tag: any) => {
            game.tags.push(tag.name);
        });

        res.developers.forEach((developer: any) => {
            game.developers.push(developer.name);
        });

        return game;
    }

    ngOnInit(){
        /*
            this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
                let aux:GameJson = res[Math.floor(Math.random() * res.length)];
                const url = "https://api.rawg.io/api/games/" + aux.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
                this.http.get(url).subscribe((res: any) => {
                    this.randomGame = this.loadGame(res);
                    console.log(this.randomGame);
                 });
        
            });
        */    
    }

    setHintTrue(){
        this.hint = true;
    }

}