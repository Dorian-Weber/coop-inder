import type {Game} from "./game";

export function filterGamesByIds(
    games : Game[],
    ids : string[],
): Game[] {
    return games.filter(game =>
        ids.includes(game.id))
}