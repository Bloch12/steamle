import { Component, Input, inject, ViewChild } from '@angular/core';
import { Game, GameJson } from '../../models/game';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent {
    @Input() search: string = "";
    @Input() buscar!: Function;
    filterList: any[] = [];
    http = inject(HttpClient);

    filtrarJuegos() {
      
      if(this.search.trim() == "" || this.search.trim().length < 3){
        this.filterList = [];   
        return;
      }
      let games!: GameJson[]; 
      this.http.get<GameJson[]>("../../assets/names.json").subscribe((res) => {
        games = res;});

      this.filterList = games.filter((game: any)=>
        game.name.toLowerCase().includes(this.search.toLowerCase())
      );
      
    }
  
    seleccionarJuego(e:string){
        this.search = e;
        this.filterList = [];
    }
    /*
    async buscarJuego(){
      const games: any = await (await fetch("../../assets/names.json")).json();
      let game: any = games.results.find((game: any) => game.name.toLowerCase() === this.search.toLowerCase());
      if(!game){
        alert("No se encontró el juego");
        this.search = "";
        this.filterList = [];
        return;
      } 

      const url: string = "https://api.rawg.io/api/games/" + game.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
      this.http.get(url).subscribe(async (res: any) => {
        game = await game.json();
        this.loadGame(game);
      });
      this.search = "";
      this.filterList = [];

    }

    textoAFecha(texto: string): number[] {
      let fechaS: string[] = texto.split("-");
      let fecha: number[] = [];
      for(let i:number = 0; i < fechaS.length; i++){
        if(isNaN(parseInt(fechaS[i])))
          return fecha;
        fecha.push(parseInt(fechaS[i]));
      }
      return fecha;
    }
  
    loadGame(res: any){
      let game: Game = {
        name: res.name as string,
        rating: res.metacritic as number,
        genres: res.genres as string[],
        tags: res.tags as string[],
        developers: res.developers as string[],
        relased: this.textoAFecha(res.released), 
        description: res.description_raw as string,
        image: res.background_image as string
      }
    }
  */
  }
