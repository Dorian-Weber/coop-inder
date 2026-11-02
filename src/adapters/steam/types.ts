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

// --- store.steampowered.com/api/appdetails ---

export interface SteamPriceOverview {
    currency: string;           // "EUR"
    initial: number;            // prix normal, en centimes
    final: number;              // prix actuel, en centimes
    discount_percent: number;   // 0 si pas de promo
}

export interface SteamCategory {
    id: number;                 // ex. 1 = multijoueur, 9 = coop, 38 = coop en ligne
    description: string;        // dépend de la langue : ne pas s'en servir pour la logique
}

export interface SteamGenre {
    id: string;                 // attention : string ici, number pour les catégories
    description: string;        // "70" = Accès anticipé
}

export interface SteamReleaseDate {
    coming_soon: boolean;       // true si le jeu n'est pas encore sorti
    date: string;               // texte localisé ("9 déc. 2020"), non fiable pour trier
}

export interface SteamAppData {
    name: string;
    is_free: boolean;
    price_overview?: SteamPriceOverview;   // absent pour les jeux gratuits ou pas encore sortis
    categories?: SteamCategory[];
    genres?: SteamGenre[];
    release_date?: SteamReleaseDate;
}

// La clé de premier niveau est l'appid demandé : { "1091500": { success, data } }
// Union discriminée : si success vaut true, data est garanti présent
export type GetAppDetailsResponse = Record<string,
    | { success: true; data: SteamAppData }
    | { success: false }
>;