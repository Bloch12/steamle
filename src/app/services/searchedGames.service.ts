import { Injectable } from "@angular/core";
import { Game } from "src/models/game";


@Injectable({providedIn: 'root'})
export class searchedGamesSercice{
    randomGame!: Game;
    searchedGames: Game[] = [];
}
