import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparadorComponent } from './comparador/comparador.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: 'app-game1',component: ComparadorComponent},
  {path: '',component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
