// Un jeu tel que renvoyé par IPlayerService/GetOwnedGames (avec include_appinfo=1)
export interface SteamOwnedGame {
    appid: number;
    name: string;
    playtime_forever: number;      // minutes
    img_icon_url: string;
    rtime_last_played: number;     // secondes Unix, 0 = jamais joué
    has_community_visible_stats?: boolean;
}

// La réponse complète de l'API
export interface GetOwnedGamesResponse {
    response: {
        game_count?: number;
        games?: SteamOwnedGame[];    // absent si la bibliothèque est privée
    };
}

// Un élément de IWishlistService/GetWishlist
export interface SteamWishlistItem {
    appid: number;
    priority: number;      // ton classement dans la wishlist (0 = non classé)
    date_added: number;    // secondes Unix
}

export interface GetWishlistResponse {
    response: {
        items?: SteamWishlistItem[];   // absent si la wishlist est privée ou vide
    };
}