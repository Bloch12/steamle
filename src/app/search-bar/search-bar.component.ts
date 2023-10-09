import { Component } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent {
    title:string = 'tp-final-steamle';

    async filtrarJuegos(event:any) {
    let texto:string = event.target.value;
    const list = document.getElementById("lista");
    if(texto.trim().length < 3){
          if(list)
            list.innerHTML = "";
          return;
    }
          
    let listaFiltrada: any;
    let games: any;
    games =  await (await fetch("../../assets/names.json")).json();
    if (texto.trim() !== "") {
          listaFiltrada = games.results.filter((game: any)=>
              game.name.toLowerCase().includes(texto.toLowerCase())
          );
    }
    listaFiltrada.forEach((element: any) => {
        const li = document.createElement("li");
        li.textContent = element.name;
        li.classList.add("juego");
        li.addEventListener("click", () => {
          this.seleccionarJuego(element.name);
        });
        if(list)
          list.appendChild(li);  
      });
  }
  
  seleccionarJuego(e:string){
      let texto:string = e;
      const aux = document.getElementById("nombre");
      let html:HTMLInputElement;
      if(aux){
        html = aux as HTMLInputElement;
        html.value = texto;
      }
      const list = document.getElementById("lista");
      if(list)
        list.innerHTML = "";
  }
  
  }
