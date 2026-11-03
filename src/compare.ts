import { fetchOwnedGames } from "./adapters/steam/fetchOwnedGames";
import {fetchWishlist} from "./adapters/steam/fetchWishlist";
import {compareProfiles, type Profile} from "./domain/comparaison";
import {fetchGameDetails} from "./adapters/steam/fetchGameDetails";
import type {GameDetails, Price} from "./domain/gameDetails";
import {filterMultiplayer} from "./domain/filterMultiplayer";
import {sortByPrice} from "./domain/sortByPrice";

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

const ids = new Set([
    ...result.commonGames.map(game => game.id),
    ...result.ownedByAWishedByB.map(game => game.id),
    ...result.ownedByBWishedByA.map(game => game.id),
    ...result.sharedWishlist,
]);

const allDetails = await Promise.all([...ids].map(id => fetchGameDetails(id)));

const detailsById = new Map<string, GameDetails>();
for (const details of allDetails) {
    if (details) {
        detailsById.set(details.id, details);
    }
}

// Retrouve les détails de chaque id ; les jeux introuvables sont ignorés
function detailsOf(ids: string[]): GameDetails[] {
    return ids
        .map(id => detailsById.get(id))
        .filter(details => details !== undefined);
}

// Les quatre listes finales : détails → multijoueur seulement → tri
const commonGames = filterMultiplayer(detailsOf(result.commonGames.map(game => game.id)))
    .toSorted((a, b) => a.name.localeCompare(b.name));
const ownedByAWishedByB = sortByPrice(filterMultiplayer(detailsOf(result.ownedByAWishedByB.map(game => game.id))));
const ownedByBWishedByA = sortByPrice(filterMultiplayer(detailsOf(result.ownedByBWishedByA.map(game => game.id))));
const sharedGames = sortByPrice(filterMultiplayer(detailsOf(result.sharedWishlist)));


const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

function formatPrice(price: Price): string {
    switch (price.kind) {
        case "free":
            return "gratuit";
        case "paid": {
            const amount = euros.format(price.finalCents / 100);
            return price.discountPercent > 0
                ? `${amount} (-${price.discountPercent} %)`
                : amount;
        }
        case "unknown":
            return "Non référencé";
    }
}


function printGames(title: string, games: GameDetails[], showPrice: boolean): void {
    console.log(`\n${title} (${games.length}) :`);
    for (const game of games) {
        let line = `- ${game.name}`;
        if (showPrice) {
            line += ` — ${formatPrice(game.price)}`;
        }
        if (game.status === "early_access") {
            line += " · Accès anticipé";
        }
        console.log(line);
    }
}

printGames("🎮 Jeux multi en commun", commonGames, false);
printGames("🎁 A possède des jeux de la wishlist de B", ownedByAWishedByB, true);
printGames("🎁 B possède des jeux de la wishlist de A", ownedByBWishedByA, true);
printGames("💸 Dans les deux wishlists", sharedGames, true);
