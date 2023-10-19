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
    filterList: any[] = [];
    http = inject(HttpClient);

    filterGame() {
      
      if(this.search.trim() == "" || this.search.trim().length < 3){
        this.filterList = [];   
        return;
      }

      let games!: GameJson[]; 

      this.http.get<GameJson[]>("../../assets/names.json").subscribe(res =>{games = res
          this.filterList = games.filter((game: any)=>
            game.name.toLowerCase().includes(this.search.toLowerCase())
          );
      });
      
    }
  
    selectGame(e:string){
        this.search = e;
        this.filterList = [];
    }

    triggerButton(){
      this.button.emit(this.search);
    }

  }
