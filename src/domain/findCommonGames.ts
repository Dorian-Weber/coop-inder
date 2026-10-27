import type {Game} from "./game";
import {filterGamesByIds} from "./filterGamesByIds";

export function findCommonGames(
    gamesA : Game[],
    gamesB : Game[],
): Game[] {
    return filterGamesByIds(gamesA, gamesB.map(game => game.id));
}

export function findMissingGames(
    gamesA : Game[],
    gamesB : Game[],
): Game[] {
    return gamesA.filter(game =>
        !gamesB.some(other =>
            other.id === game.id))
}