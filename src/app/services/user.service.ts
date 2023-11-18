import { Injectable } from "@angular/core";
import { addUser  as loadUser, getUser, setWin} from "src/config/config";
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

        if(!this.userData.game1)
            this.userData.game1 = inicializeUserData().game1;

        if(!this.userData.game2)
            this.userData.game2 = inicializeUserData().game2;
        
        if(!this.userData.game3)
            this.userData.game3 = inicializeUserData().game3;
    }

    async addAWinGame1(date: number[],trys: number){
        if(trys>10){
            trys = 10;
        }
        this.userData.game1.winStreak += 1;
        this.userData.game1.lastWin = date;
        (this.userData.game1.winArray[trys-1])++;
        await setWin(this.id, this.userData);
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

    async addAWinGame2(name: string, score: number){
        this.userData.game2.Leadboararray.push({name: name, score: score});
        this.userData.game2.Leadboararray.sort((a,b)=>b.score-a.score);
        this.userData.game2.Leadboararray.pop();
        await setWin(this.id, this.userData);
    }

    async addAWinGame3(name: string, score: number){
        this.userData.game3.Leadboararray.push({name: name, score: score});
        this.userData.game3.Leadboararray.sort((a,b)=>b.score-a.score);
        this.userData.game3.Leadboararray.pop();
        await setWin(this.id, this.userData);
    }

    public getGame2Leadboard(): {name: string, score: number}[]{
        return this.userData.game2.Leadboararray;
    }

    public getGame3Leadboard(): {name: string, score: number}[]{
        return this.userData.game3.Leadboararray;
    }
}