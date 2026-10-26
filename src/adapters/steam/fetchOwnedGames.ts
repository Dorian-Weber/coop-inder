import type { GetOwnedGamesResponse } from "./types";
import type { Game } from "../../domain/game"
import {toGame} from "./toGame";

const STEAM_API_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/";

export async function fetchOwnedGames(steamId: string): Promise<Game[]> {
    // récupérer la clé depuis process.env, erreur claire si absente
    const steamApiKey = process.env.STEAM_API_KEY;
    if(!steamApiKey) {
        throw new Error("SteamApiKey manquant dans le fichier .env");
    }

    // construire l'URL avec ses paramètres
    const url = new URL(STEAM_API_URL);
    url.searchParams.set("key", steamApiKey);
    url.searchParams.set("steamid", steamId);
    url.searchParams.set("include_appinfo", "1");

    // appeler l'API
    const response = await fetch(url);

    // lever une erreur si la réponse HTTP n'est pas OK
    if (!response.ok) {
        throw new Error(`Erreur API Steam : ${response.status} ${response.statusText}`);
    }

    // lire le JSON et renvoyer les jeux (tableau vide si profil privé)
    const data = (await response.json()) as GetOwnedGamesResponse;
    return (data.response.games ?? []).map(toGame);
}