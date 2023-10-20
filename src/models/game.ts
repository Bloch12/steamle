export interface Game {
    name: string;
    description: string;
    genders: string[];
    tags: string[];
    image: string;
    rating: number;
    developers: string[];
    relased: number[];
}

export interface GameJson {
    name: string;
    slug: string;
    id:number;
    image: string;
}