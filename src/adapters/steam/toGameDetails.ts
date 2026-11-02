import type {GameDetails, Price} from "../../domain/gameDetails";
import type {SteamAppData} from "./types";

export function toGameDetails(appid: string, data: SteamAppData): GameDetails {
    return {
        id: appid,
        name: data.name,
        price: toPrice(data),
        isMultiplayer: false,         // provisoire
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