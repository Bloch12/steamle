import { Component } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent {
    search: string = "";
    filterList: any[] = [];

    async filtrarJuegos() {
      if(this.search.trim() == "" || this.search.trim().length < 3){
        this.filterList = [];   
        return;
      }

      const games: any =  await (await fetch("../../assets/names.json")).json();
           
      this.filterList = games.results.filter((game: any)=>
        game.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  
    seleccionarJuego(e:string){
        this.search = e;
        this.buscarJuego();
    }

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
      game = await fetch(url);
      game = await game.json();
      game = this.loadGame(game);
      let aux = document.getElementById("comparador");
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
      let game: any = {};
      game.name = res.name;
      game.metacritic = res.metacritic;
      game.genres = res.genres;
      game.tags = res.tags;
      game.develpers = res.developers;
      game.relased = this.textoAFecha(res.released);
      return game;
  }
  
  }
