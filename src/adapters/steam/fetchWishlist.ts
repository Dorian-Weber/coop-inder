import type {GetWishlistResponse, SteamWishlistItem} from "./types";

const STEAM_WISHLIST_API_URL = "https://api.steampowered.com/IWishlistService/GetWishlist/v1/";

export async function fetchWishlist(steamId : string): Promise<string[]> {

    const url = new URL(STEAM_WISHLIST_API_URL);
    url.searchParams.set("steamid", steamId);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur API Steam ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as GetWishlistResponse;
    return (data.response.items ?? []).map(item => String(item.appid))
}