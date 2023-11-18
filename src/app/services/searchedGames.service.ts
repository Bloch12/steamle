import { inject, Injectable } from "@angular/core";
import { Game } from "src/models/game";
import { HttpClient } from "@angular/common/http";
import { GameJson } from "src/models/game";
import { userService } from "./user.service";


@Injectable({providedIn: 'root'})
export class searchedGamesSercice{
    constructor(private userService: userService){};
    randomGame!: Game;
    searchedGames: Game[] = [];
    isWin: boolean = false;
    http = inject(HttpClient);

    async addGame(gameId: number){
        const game: Game = await this.getGame(gameId); 
        this.searchedGames.push(game);
        this.loadGames();
        if(game.name === this.randomGame.name){
            this.addWin();
        }
    }

    getGames(){
        if(localStorage.getItem("searchedGames")){
            if(localStorage.getItem("date") != JSON.stringify(this.getCurrentDate())) {
                localStorage.removeItem("searchedGames");
                localStorage.removeItem("date");
                this.isWin = false;
                return; 
            }
            this.searchedGames = JSON.parse(localStorage.getItem("searchedGames") || "");
        }
    }

    loadGames(){
        localStorage.setItem("searchedGames", JSON.stringify(this.searchedGames));
        let dateArray = this.getCurrentDate();
        localStorage.setItem("date", JSON.stringify(dateArray));
    }

    getJsonGame(): Promise<GameJson[]>{
        return new Promise((resolve, reject) => {
            this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{
                resolve(res);
            });
        }); 
    }

    getGame(gameId: number): Promise<Game>{
        return new Promise((resolve, reject) => {
            const url: string = "https://api.rawg.io/api/games/" + gameId + "?key=6bf148d28f1c48dd90a904b72e52b717";
            this.http.get(url).subscribe(async (res: any) => {
                const game = (this.loadGame(res));
                resolve(game);
            });
        });
    }

    async getRandomGame(){
            const res = await this.getJsonGame();
            const maxRange: number = res.length;
            let dateArray= this.getCurrentDate();
            let seed = dateArray[0] * (dateArray[1] + 1) + dateArray[2];
            let random = Math.sin(seed) * 10000;
            random = random - Math.floor(random);
            random = random * maxRange;
            random = Math.floor(random);
            const Gameid = res[random].id;
            this.randomGame = await this.getGame(Gameid);
    }

    async getARandomGame(): Promise<Game>{
        const res = await this.getJsonGame();
        const maxRange: number = res.length;
        let random:number = Math.random() * maxRange;
        random = Math.floor(random);
        const Gameid = res[random].id;
        const randomGame = await this.getGame(Gameid);
        return randomGame;
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
        console.log(game);
        return game;
    }

    setWin(){
        this.isWin = true;
    }

    addWin(){
        this.userService.addAWinGame1(this.getCurrentDate(),this.searchedGames.length);
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
