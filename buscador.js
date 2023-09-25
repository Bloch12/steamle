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





function seleccionarJuego(e){
    let texto = e;
    document.getElementById("nombre").value = texto;
    filtrarJuegos(texto);
}

