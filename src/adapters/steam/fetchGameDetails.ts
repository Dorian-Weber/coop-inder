import type { GameDetails } from "../../domain/gameDetails";
import type { GetAppDetailsResponse } from "./types";
import { toGameDetails } from "./toGameDetails";

const STEAM_APPDETAILS_URL = "https://store.steampowered.com/api/appdetails";

export async function fetchGameDetails(appid: string): Promise<GameDetails | undefined> {
    // construire l'URL avec appids, cc=fr et l=french
    const url = new URL(STEAM_APPDETAILS_URL);
    url.searchParams.set("appids", appid);
    url.searchParams.set("cc", "fr" );
    url.searchParams.set("l", "french" );

    // appeler l'API et vérifier response.ok

    const response = await fetch(url);

    // lire le JSON avec le bon type
    if (!response.ok) {
        throw new Error(`Erreur API Steam Details : ${response.status} ${response.statusText}`);
    }

    // ouvrir l'enveloppe et renvoyer le résultat
    const data = (await response.json()) as GetAppDetailsResponse;

    const entry = data[appid];
    if (!entry || !entry.success) {
        return undefined;                    // jeu introuvable ou indisponible
    }
    return toGameDetails(appid, entry.data); // ici, TypeScript sait que entry.data existe
}
console.log(await fetchGameDetails("1091500"));
console.log(await fetchGameDetails("1"));
