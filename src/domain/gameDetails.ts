import type {Game} from "./game";

// Le prix : trois situations, chacune avec ses propres champs
export type Price =
    | { kind: "paid"; finalCents: number; initialCents: number; discountPercent: number }
    | { kind: "free" }
    | { kind: "unknown" };   // pas encore sorti, indisponible dans le pays…

// Le statut de sortie
export type ReleaseStatus = "released" | "early_access" | "coming_soon";


export interface GameDetails extends Game {
    price: Price; // prix actuel du jeu, prix d'origine et promo
    isMultiplayer : boolean; // annonce si multijoueur en fonction des différentes catégorie possible
    genres: string[]; // on récupère liste des genres
    status: ReleaseStatus; // permet de savoir si le jeu est en accès anticipée
}