import { fetchOwnedGames } from "./adapters/steam/fetchOwnedGames";
import { findCommonGames } from "./domain/findCommonGames";

// récupérer les deux SteamID passés en ligne de commande
const [idA, idB] = process.argv.slice(2);

// s'il en manque un, afficher comment utiliser le script et s'arrêter
if (!idA || !idB ) {
    throw new Error("Il manque un id")
}

// récupérer les deux bibliothèques
const [gamesA, gamesB] = await Promise.all([fetchOwnedGames(idA), fetchOwnedGames(idB)]);

// calculer les jeux en commun
const commonGames = findCommonGames(gamesA, gamesB);
console.log(`${commonGames.length} jeux en commun`);

// afficher le nombre de jeux en commun, puis leurs noms
commonGames.sort((a,b) => a.name.localeCompare(b.name));
for (const game of commonGames) {
    console.log(`- ${game.name}`);
}