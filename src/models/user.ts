export interface userData{
    game1: game1Data;
    game2: game2Data;   
}



interface game1Data{
    lastWin: number[];
    winStreak: number;
    winArray: number[];
}

interface game2Data{
    Leadboararray: Leadboard[];
}

interface Leadboard{
    name: string;
    score: number;
}

export function inicializeUserData(): userData{
    return {
        game1: inicializeGame1Data(),
        game2: inicializeGame2Data()
    }
}

function inicializeGame1Data(): game1Data{
    return {
        lastWin: [] = [0,0,0],
        winStreak: 0,
        winArray: [] = [0,0,0,0,0,0,0,0,0,0]
    }
}

export function inicializeGame2Data(): game2Data{
    return {
        Leadboararray: [] = [
            inicializeLeadboard("eee",500),
            inicializeLeadboard("ddd",400),
            inicializeLeadboard("ccc",300),
            inicializeLeadboard("bbb",200),
            inicializeLeadboard("aaa",100)
          ]
    }
}

export function inicializeLeadboard(name: string,score: number): Leadboard{
    return {
        name: name,
        score: score
    }
}