import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparadorComponent } from './comparador/comparador.component';
import { IndexComponent } from './index/index.component';
import { Game2Component } from './game2/game2.component';
import { Game3Component } from './game3/game3.component';

const routes: Routes = [
  {path: 'app-game1',component: ComparadorComponent},
  {path: 'app-game2',component: Game2Component},
  {path: 'app-game3',component: Game3Component},
  {path: '',component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
