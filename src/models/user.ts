export interface userData{
    game1: game1Data;
}



interface game1Data{
    lastWin: number[];
    winStreak: number;
    winArray: number[];
}

export function inicializeUserData(): userData{
    return {
        game1: inicializeGame1Data()
    }
}

function inicializeGame1Data(): game1Data{
    return {
        lastWin: [] = [0,0,0],
        winStreak: 0,
        winArray: [] = [0,0,0,0,0,0,0,0,0,0]
    }
}