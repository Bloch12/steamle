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
      /** Esto lo deberia enviar*/
        this.search = e;
        this.filterList = [];
    }
  
  }
