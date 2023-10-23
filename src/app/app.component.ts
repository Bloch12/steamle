import { Component } from '@angular/core';
import {addUser,getUser} from '../config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  async ngOnInit(){
    if(!localStorage.getItem("userId"))
      await addUser(); 
    const user: string | null = localStorage.getItem("userId");
    if(user != null){
      getUser(user).then((user) => {
        console.log(user);
      });
    }
     
  } 
}
