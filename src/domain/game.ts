export interface Game {
    id: string; // string et non number : les identifiants varient selon les plateformes (Steam : nombre, Epic : texte)
    name: string;
}