import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ComparadorComponent } from './comparador/comparador.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { ComparedGameComponent } from './compared-game/compared-game.component';
import { FooterComponent } from './footer/footer.component'; 


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ComparadorComponent,
    HeaderComponent,
    ComparedGameComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
