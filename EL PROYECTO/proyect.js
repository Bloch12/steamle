let games = [];

function loadGames(url, count){
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
    res.results.forEach(element => {
        let game = {
            name: element.name,
            slug: element.slug,
            id: element.id,
            image: element.background_image
        }
        games.push(game);
        
    });
    console.log(JSON.stringify(games));
    });
}

const button = document.getElementById("boton");

button.addEventListener("click", function(e){
    e.preventDefault();
    loadGames("https://api.rawg.io/api/games?page=8&page_size=100&key=24a2c31e00d64d74a0ceca7f9347c3bf", 0);
});


async function filtrarJuegos(texto) {
    if(texto.trim().length < 3)
        return;
    let listaFiltrada = [];
    games = await (await fetch("./json/names.json")).json();
    if (texto.trim() !== "") {
        listaFiltrada = games.results.filter(game =>
            game.name.toLowerCase().includes(texto.toLowerCase())
        );
    } else {
        listaFiltrada = games;
    }
    console.log(listaFiltrada);
    let list = document.getElementById("lista");
    let html = "";
    listaFiltrada.forEach(element => {
        html += `<li class="juego">${element.name}
        </li>`;
    });
    list.innerHTML = html;
}


