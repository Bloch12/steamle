import { Component, inject, Output, EventEmitter } from '@angular/core';
import { GameJson } from '../../models/game';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent {
    search: string = "";
    @Output() button = new EventEmitter<string | undefined>;
    filterList: string[] = [];
    http = inject(HttpClient);

    filterGame(event: KeyboardEvent) {
      
      if(event.key=="Enter"){
        this.search= this.filterList[0];
        this.triggerButton();
        return;
      }

      if(this.search.trim() == "" || this.search.trim().length < 3){
        this.filterList = [];   
        return;
      }

      let games!: GameJson[]; 

      this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{games = res
          games = games.filter((game: any)=>
            game.name.toLowerCase().includes(this.search.toLowerCase())
          );

          this.filterList = games.map((game: any)=> game.name);
      });
    
    }
  
    selectGame(e:string){
        this.search= e;
        this.triggerButton();
    }

    triggerButton(){
      this.button.emit(this.search);
      this.filterList = [];
      this.search = "";
    }

  }
