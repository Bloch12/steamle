/*let games = [];

function loadGames(url, count){
    if(count > 10)
        return;
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
    loadGames(res.next, count+1);
    });
}

const button = document.getElementById("boton");

button.addEventListener("click", function(e){
    e.preventDefault();
    loadGames("https://api.rawg.io/api/games?page=19&page_size=100&key=24a2c31e00d64d74a0ceca7f9347c3bf", 0);
});
*/

async function filtrarJuegos(texto) {
    let list = document.getElementById("lista");
    if(texto.trim().length < 3){
        list.innerHTML = "";
        return;
    }
        
    let listaFiltrada = [];
    games = await (await fetch("./json/names.json")).json();
    if (texto.trim() !== "") {
        listaFiltrada = games.results.filter(game =>
            game.name.toLowerCase().includes(texto.toLowerCase())
        );
    }
    let html = "";
    listaFiltrada.forEach(element => {
        html += `<li class="juego" onclick="seleccionarJuego('${element.name}')" >${element.name}
        </li>`;
    });
    list.innerHTML = html;
}

const button = document.getElementById("enviar");
button.addEventListener("click", async function(e){
    e.preventDefault();
    let texto = document.getElementById("nombre").value;
    const games = await (await fetch("./json/names.json")).json();
    const game = games.results.find(game => game.name.toLowerCase() === texto.toLowerCase());
    if(!game) return;
    const url = "https://api.rawg.io/api/games/" + game.id + "?key=24a2c31e00d64d74a0ceca7f9347c3bf"
    console.log(url); 
    fetch(url).then(res=>res.json()).then(res=>{
        let html = "";
        let list = document.getElementById("lista");
        html += `<li class="juego">${res.name}
        </li>`;
        html += `<li class="juego">metacritic: ${res.metacritic}
        </li>`;
        res.genres.forEach(element => {
            html += `<li class="juego">${element.name}
            </li>`;
        });
        res.tags.forEach(element => {
            html += `<li class="juego">${element.name}
            </li>`;
        });
        list.innerHTML = html;
    });
});


function seleccionarJuego(e){
    let texto = e;
    document.getElementById("nombre").value = texto;
    filtrarJuegos(texto);
}

