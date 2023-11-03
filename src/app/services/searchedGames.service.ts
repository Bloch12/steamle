import { inject, Injectable } from "@angular/core";
import { Game } from "src/models/game";
import { HttpClient } from "@angular/common/http";
import { GameJson } from "src/models/game";


@Injectable({providedIn: 'root'})
export class searchedGamesSercice{
    randomGame!: Game;
    searchedGames: Game[] = [];
    http = inject(HttpClient);

    addGame(gameId: number){
        const url: string = "https://api.rawg.io/api/games/" + gameId + "?key=6bf148d28f1c48dd90a904b72e52b717";
        this.http.get(url).subscribe(async (res: any) => {
            const game = (this.loadGame(res));
            this.searchedGames.push(game);
            this.loadGames();
        });
    }

    getGames(){
        if(localStorage.getItem("searchedGames")){
            if(localStorage.getItem("date") == JSON.stringify(this.getCurrentDate())) {
                this.searchedGames = JSON.parse(localStorage.getItem("searchedGames") || "");
            }
            localStorage.removeItem("searchedGames");
            localStorage.removeItem("date");
        }
    }

    loadGames(){
        localStorage.setItem("searchedGames", JSON.stringify(this.searchedGames));
        let dateArray = this.getCurrentDate();
        localStorage.setItem("date", JSON.stringify(dateArray));
    }

    getRandomGame(){
        this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
            const maxRange: number = res.length;
            let dateArray= this.getCurrentDate();
            let seed = dateArray[0] * (dateArray[1] + 1) + dateArray[2];
            let random = Math.sin(seed) * 10000;
            random = random - Math.floor(random);
            random = random * maxRange;
            random = Math.floor(random);
            
            this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
                let aux:GameJson = res[random];
                const url = "https://api.rawg.io/api/games/" + aux.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
                this.http.get(url).subscribe((res: any) => {
                    this.randomGame = this.loadGame(res);
                    console.log(this.randomGame);
                });
            }); 
        });   
    }



    getCurrentDate(): number[]{
        let date = new Date();
        let dateArray = [date.getFullYear(), date.getMonth(), date.getDate()];
        return dateArray;
    }

    loadGame(res: any): Game{
        let game: Game = {
          name: res.name as string,
          rating: res.metacritic as number,
          genders:[],
          tags:[],
          developers:[],
          relased: this.textToDate(res.released), 
          description: res.description_raw as string,
          image: res.background_image as string
        }
        res.genres.forEach((genre: any) => {
            game.genders.push(genre.name);
        });

        res.tags.forEach((tag: any) => {
            game.tags.push(tag.name);
        });

        res.developers.forEach((developer: any) => {
            game.developers.push(developer.name);
        });

        return game;
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



}
