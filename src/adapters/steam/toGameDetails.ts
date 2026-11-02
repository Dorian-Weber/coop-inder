import type {GameDetails, Price} from "../../domain/gameDetails";
import type {SteamAppData} from "./types";

// Catégories Steam qui signifient « jouable à plusieurs »
const MULTIPLAYER_CATEGORY_IDS = [1, 9, 24, 36, 37, 38, 39, 47, 48];

export function toGameDetails(appid: string, data: SteamAppData): GameDetails {
    return {
        id: appid,
        name: data.name,
        price: toPrice(data),
        isMultiplayer: toIsMultiplayer(data),
        genres: [],                   // provisoire
        status: "released",           // provisoire
    };
}

function toPrice(data: SteamAppData): Price {
    if (data.is_free) {
        return { kind: "free" };
    }
    if (data.price_overview) {
        return {
            kind: "paid",
            finalCents: data.price_overview?.final,
            initialCents:data.price_overview?.initial,
            discountPercent:data.price_overview?.discount_percent,
        };
    }
    return { kind: "unknown" };
}


function toIsMultiplayer(data: SteamAppData): boolean {
    const categories = data.categories ?? [];
    return categories.some(category => MULTIPLAYER_CATEGORY_IDS.includes(category.id));
}