import { Injectable } from "@angular/core";
import { addUser  as loadUser, getUser} from "src/config/config";
import { userData, inicializeUserData } from "src/models/user";

@Injectable({providedIn:  'root'})
export class userService{
    
    private userData!: userData;
    
    private async addUser(): Promise<string>{
        const newUser: userData = inicializeUserData();
        let userId = await loadUser(newUser);
        return userId;
    }

    async validateUser(){
        let userId = localStorage.getItem("userId");
        
        if(!userId){
            userId = await this.addUser();
        }

        this.userData = await getUser(userId);
    }
}