import { Component } from '@angular/core';
import {addUser,getUser} from '../config/config';
import { userService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(private userService: userService){}
  
  ngOnInit(){
      this.userService.validateUser();
  }
}
