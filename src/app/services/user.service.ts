import { Injectable } from "@angular/core";
import { addUser  as loadUser, getUser, setWinGame1} from "src/config/config";
import { userData, inicializeUserData } from "src/models/user";

@Injectable({providedIn:  'root'})
export class userService{
    
    private userData!: userData;
    private id!: string;
    
    private async addUser(): Promise<string>{
        const newUser: userData = inicializeUserData();
        let userId = await loadUser(newUser);
        localStorage.setItem("userId",userId);
        return userId;
    }

    async validateUser(){
        let userId = localStorage.getItem("userId");
        
        if(!userId){
            userId = await this.addUser();
        }

        this.userData = await getUser(userId);
        this.id = userId;
    }

    async addAWinGame1(date: number[],trys: number){
        if(trys>10){
            trys = 10;
        }
        this.userData.game1.winStreak += 1;
        this.userData.game1.lastWin = date;
        (this.userData.game1.winArray[trys-1])++;
        await setWinGame1(this.id, this.userData);
    }
    getUserData():userData{
        return this.userData;
    }
    getTotalWins():number{
        let rta = 0;
        this.userData.game1.winArray.forEach((element)=>{
            rta += element;
        });
        return rta;
    }
}