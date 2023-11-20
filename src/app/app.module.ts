import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ComparadorComponent } from './comparador/comparador.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ComparedGameComponent } from './compared-game/compared-game.component';
import { FooterComponent } from './footer/footer.component';
import { Game2Component } from './game2/game2.component';
import { WiningSingComponent } from './wining-sing/wining-sing.component';
import { LeadboardComponent } from './leadboard/leadboard.component';
import { ScoreFormComponent } from './score-form/score-form.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Game3Component } from './game3/game3.component';
import { RulesComponent } from './rules/rules.component';
import { JsonDataComponent } from './json-data/json-data.component';
import { LoseSingComponent } from './lose-sing/lose-sing.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ComparadorComponent,
    HeaderComponent,
    ComparedGameComponent,
    FooterComponent,
    Game2Component,
    WiningSingComponent,
    LeadboardComponent,
    ScoreFormComponent,
    Game3Component,
    RulesComponent,
    JsonDataComponent,
    LoseSingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
