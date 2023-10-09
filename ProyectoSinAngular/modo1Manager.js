

let randomGame;
let allreadyCompared = [];
document.addEventListener("DOMContentLoaded", async()=>{
    try{
    const games = await (await fetch("./json/names.json")).json();
    randomGame = games.results[Math.floor(Math.random() * games.results.length)];
    const url = "https://api.rawg.io/api/games/" + randomGame.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
    randomGame = await fetch(url);
    randomGame = await randomGame.json();
    randomGame = loadGame(randomGame);
    console.log(randomGame);
    }catch(e){
        console.log(e);
    }
});

const button = document.getElementById("enviar");
button.addEventListener("click", async function(e){
    e.preventDefault();
    let texto = document.getElementById("nombre").value;
    const games = await (await fetch("./json/names.json")).json();
    let game = games.results.find(game => game.name.toLowerCase() === texto.toLowerCase());
    if(!game) return;
    if(allreadyCompared.includes(game.name)) return;
    const url = "https://api.rawg.io/api/games/" + game.id + "?key=6bf148d28f1c48dd90a904b72e52b717";
    game = await fetch(url);
    game = await game.json();
    game = loadGame(game);
    comparar(game);
});

function textoAFecha(texto){
    fecha = texto.split("-");
    fecha.map(element =>{
        if(NaN)
            return 0;
        parseInt(element);
    });	
    return fecha;
}

function loadGame(res){
    let game = {};
    game.name = res.name;
    game.metacritic = res.metacritic;
    game.genres = res.genres;
    game.tags = res.tags;
    game.develpers = res.developers;
    game.relased = textoAFecha(res.released);
    return game;
}

function comparar(game){
    allreadyCompared.push(game.name);
    var contenedor = document.getElementById('contenedor');
    var nuevaSeccion = document.createElement('div');
    nuevaSeccion.id = game.name;

    if(game.name === randomGame.name){
        nuevaSeccion.innerHTML += `<p>¡Has acertado!</p>`;
        document.getElementById('contenedor').appendChild(nuevaSeccion);
        return;
    }
    nuevaSeccion.innerHTML += `<p>${game.name}</p>`;
    if(game.metacritic < randomGame.metacritic){
        nuevaSeccion.innerHTML += `<p>Metacritic: MAYOR A ${game.metacritic}</p>`;
    }else if(game.metacritic > randomGame.metacritic){
        nuevaSeccion.innerHTML += `<p>Metacritic: MENOR A ${game.metacritic}</p>`;
    }else{
        nuevaSeccion.innerHTML += `<p>Metacritic: IGUAL A ${game.metacritic}</p>`;
    }

    nuevaSeccion.innerHTML += `<ul>Generos:</ul>`;
    game.genres.forEach(element => {
        randomGame.genres.forEach(element2 => {
            if(element.name === element2.name)
            nuevaSeccion.innerHtML += `<li>${element.name}</li>`;
        });
    });

    nuevaSeccion.innerHTML += `<ul>Tags:</ul>`;
    game.tags.forEach(element => {
        randomGame.tags.forEach(element2 => {
            if(element.name === element2.name)
            nuevaSeccion.innerHTML += `<li>${element.name}</li>`;
        });
    });

    nuevaSeccion.innerHTML += `<ul>Desarrolladores: </ul>`;
    game.develpers.forEach(element => {
        randomGame.develpers.forEach(element2 => {
            if(element.name === element2.name)
            nuevaSeccion.innerHTML += `<li>${element.name}</li>`;
        });
    });

    nuevaSeccion.innerHTML += `<p>Fecha de lanzamiento es ${compararFecha(game)} a: ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}</P>`;
    document.getElementById('contenedor').appendChild(nuevaSeccion);
}

function compararFecha(game){
    if(game.relased[0] < randomGame.relased[0])
        return "mayor";
    if(game.relased[0] > randomGame.relased[0])
        return "menor";
    if(game.relased[1] < randomGame.relased[1])
        return "mayor";
    if(game.relased[1] > randomGame.relased[1])
        return "menor";
    if(game.relased[2] < randomGame.relased[2])
        return "mayor";
    if(game.relased[2] > randomGame.relased[2])
        return "menor";
    return "igual"; 
}
    

