import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ComparadorComponent } from './comparador/comparador.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ComparadorComponent,
    HeaderComponent
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
