import { Component } from '@angular/core';

@Component({
  selector: 'comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
export class ComparadorComponent {
    juegoRandom: any = {};
    juegosBuscados: any[] = [];
    
    public Agregar(game: any){
        if(this.juegosBuscados.includes(game.name))
            return;
        this.juegosBuscados.push(game.name);
    }

    ComapararScore(game: any):string{
        if(game.metacritic < this.juegoRandom.metacritic){
            return `Metacritic: MAYOR A ${game.metacritic}`;
        }
        if(game.metacritic > this.juegoRandom.metacritic){
            return `Metacritic: MENOR A ${game.metacritic}`;
        }
        return `Metacritic: IGUAL A ${game.metacritic}`;
    }

    compararFecha(game: any){
        if(game.relased[0] < this.juegoRandom.relased[0])
            return `Fecha de lanzamiento es mayor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        if(game.relased[0] > this.juegoRandom.relased[0])
            return `Fecha de lanzamiento es menor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        if(game.relased[1] < this.juegoRandom.relased[1])
            return `Fecha de lanzamiento es mayor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        if(game.relased[1] > this.juegoRandom.relased[1])
            return `Fecha de lanzamiento es menor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        if(game.relased[2] < this.juegoRandom.relased[2])
            return `Fecha de lanzamiento es mayor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        if(game.relased[2] > this.juegoRandom.relased[2])
            return `Fecha de lanzamiento es menor a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`;
        return `Fecha de lanzamiento es igual a ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}`; 
    }

}