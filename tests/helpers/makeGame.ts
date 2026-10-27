import type {Game} from "../../src/domain/game";

export function makeGame(id: number, name: string): Game {
    return {id: String(id), name};
}