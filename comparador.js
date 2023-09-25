

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
    let html = document.getElementById("comparador");
    if(game.name === randomGame.name){
        html.innerHTML = `<h1>¡Has acertado!</h1>`;
        return;
    }
    html += `<p>${game.name}</p>`;
    if(game.metacritic < randomGame.metacritic){
        html += `<p>Metacritic: MAYOR A ${game.metacritic}</p>`;
    }else if(game.metacritic > randomGame.metacritic){
        html += `<p>Metacritic: MENOR A ${game.metacritic}</p>`;
    }else{
        html += `<p>Metacritic: IGUAL A ${game.metacritic}</p>`;
    }

    html += `<ul>Generos:</ul>`;
    game.genres.forEach(element => {
        randomGame.genres.forEach(element2 => {
            if(element.name === element2.name)
                html += `<li>${element.name}</li>`;
        });
    });

    html += `<ul>Tags:</ul>`;
    game.tags.forEach(element => {
        randomGame.tags.forEach(element2 => {
            if(element.name === element2.name)
                html += `<li>${element.name}</li>`;
        });
    });

    html += `<ul>Desarrolladores:</ul>`;
    game.develpers.forEach(element => {
        randomGame.develpers.forEach(element2 => {
            if(element.name === element2.name)
                html += `<li>${element.name}</li>`;
        });
    });

    html += `<p>Fecha de lanzamiento es ${compararFecha(game)} a: ${game.relased[0]}/${game.relased[1]}/${game.relased[2]}</p>`;
    document.getElementById("comparador").innerHTML = html;
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
    

