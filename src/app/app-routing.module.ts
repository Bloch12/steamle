import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparadorComponent } from './comparador/comparador.component';
import { Game2Component } from './game2/game2.component';
import { Game3Component } from './game3/game3.component';
import { JsonDataComponent } from './json-data/json-data.component';
import { authGuard } from './auth-guard.guard';
import { userGuard } from './user.guard.guard';

const routes: Routes = [
  {path: '',component: ComparadorComponent, canActivate: [userGuard]},
  {path: 'app-game2',component: Game2Component, canActivate: [userGuard]},
  {path: 'app-game3',component: Game3Component, canActivate: [userGuard]},
  {path: 'jsonData',component: JsonDataComponent, canActivate: [authGuard]},
  {path: '**',component: ComparadorComponent, canActivate: [userGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
