import type { Game } from "./game";
import {findCommonGames} from "./findCommonGames";
import {filterGamesByIds} from "./filterGamesByIds";
import {findCommonIds} from "./findCommonIds";

// Ce qu'on sait d'un joueur
export interface Profile {
    library: Game[];
    wishlist: string[];   // ids uniquement
}

export interface ComparisonResult {
    commonGames: Game[];          // possédés par A et par B
    ownedByAWishedByB: Game[];    // A les possède, B les veut
    ownedByBWishedByA: Game[];    // B les possède, A les veut
    sharedWishlist: string[];     // les deux les veulent
}

export function compareProfiles(a: Profile, b: Profile): ComparisonResult {
    return {
        commonGames: findCommonGames(a.library, b.library),
        ownedByAWishedByB: filterGamesByIds(a.library, b.wishlist),
        ownedByBWishedByA: filterGamesByIds(b.library, a.wishlist),
        sharedWishlist: findCommonIds(a.wishlist, b.wishlist)
    };
}