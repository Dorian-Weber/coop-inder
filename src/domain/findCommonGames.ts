import type {SteamOwnedGame} from "../adapters/steam/types";

export function findCommonGames(
    gamesA : SteamOwnedGame[],
    gamesB : SteamOwnedGame[],
): SteamOwnedGame[] {
    return gamesA.filter(game =>
                gamesB.some(other =>
                    other.appid === game.appid))
}

export function findMissingGames(
    gamesA : SteamOwnedGame[],
    gamesB : SteamOwnedGame[],
): SteamOwnedGame[] {
    return gamesA.filter(game =>
        !gamesB.some(other =>
            other.appid === game.appid))
}