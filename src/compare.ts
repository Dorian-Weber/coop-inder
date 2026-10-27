import { fetchOwnedGames } from "./adapters/steam/fetchOwnedGames";
import { findCommonGames } from "./domain/findCommonGames";
import {fetchWishlist} from "./adapters/steam/fetchWishlist";
import {compareProfiles, type Profile} from "./domain/comparaison";
import type {Game} from "./domain/game";

// récupérer les deux SteamID passés en ligne de commande
const [idA, idB] = process.argv.slice(2);

// s'il en manque un, afficher comment utiliser le script et s'arrêter
if (!idA || !idB ) {
    throw new Error("Il manque un id")
}

// récupérer les deux bibliothèques
const [libraryA, wishlistA, libraryB, wishlistB] = await Promise.all([
    fetchOwnedGames(idA),
    fetchWishlist(idA),
    fetchOwnedGames(idB),
    fetchWishlist(idB)]);

const profileA : Profile = {library: libraryA, wishlist: wishlistA}
const profileB : Profile = {library: libraryB, wishlist: wishlistB}


const result =  compareProfiles(profileA, profileB);


function printGames(title: string, games: Game[]): void {
    console.log(`\n${title} (${games.length}) :`);
    const sorted = games.toSorted((a, b) => a.name.localeCompare(b.name));
    for (const game of sorted) {
        console.log(`- ${game.name}`);
    }
}

// afficher le nombre de jeux en commun, puis leurs noms

printGames( "Jeux posséder en commun", result.commonGames);
printGames( "A possède des jeux de la wishlist de B ", result.ownedByAWishedByB);
printGames( "B possède des jeux de la wishlist de A ", result.ownedByBWishedByA);
const shared = result.sharedWishlist;
console.log(`\n💸 Dans les deux wishlists (${shared.length}) :`);
for (const id of shared) {
    console.log(`- https://store.steampowered.com/app/${id}`);
}

