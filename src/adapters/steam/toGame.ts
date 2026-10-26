import type {SteamOwnedGame} from "./types";
import type {Game} from "../../domain/game";

export function toGame(steamGame: SteamOwnedGame): Game {
    return {id: String(steamGame.appid), name: steamGame.name};
}