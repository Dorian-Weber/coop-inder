import type {Game} from "./game";

export function findCommonGames(
    gamesA : Game[],
    gamesB : Game[],
): Game[] {
    return gamesA.filter(game =>
                gamesB.some(other =>
                    other.id === game.id))
}

export function findMissingGames(
    gamesA : Game[],
    gamesB : Game[],
): Game[] {
    return gamesA.filter(game =>
        !gamesB.some(other =>
            other.id === game.id))
}