import { unPokemon } from "./tabla";

async function infoPokemon(){
    const dato = localStorage.getItem("dato");
    let pokemon = await unPokemon(dato);
    mostrarPokemon(pokemon)
}

function mostrarPokemon(pokemon){

}



infoPokemon();