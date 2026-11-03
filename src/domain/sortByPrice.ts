import type {GameDetails, Price} from "./gameDetails";

// Transforme un prix en nombre comparable : gratuit < payant < inconnu
function priceSortKey(price: Price): number {
    switch (price.kind) {
        case "free":
            return -1;
        case "paid":
            return price.finalCents;
        case "unknown":
            return Number.MAX_SAFE_INTEGER;   // le plus grand entier fiable en JavaScript
    }
}

export function sortByPrice(games: GameDetails[]): GameDetails[] {
    return games.toSorted((a, b) => priceSortKey(a.price) - priceSortKey(b.price));
}