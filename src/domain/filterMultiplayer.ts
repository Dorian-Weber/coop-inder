import type {GameDetails} from "./gameDetails";

export function filterMultiplayer(games: GameDetails[]): GameDetails[] {
    return games.filter((game: GameDetails) => game.isMultiplayer);
}