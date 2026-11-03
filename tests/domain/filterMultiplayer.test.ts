import { describe, it, expect } from "vitest";
import {makeGameDetails} from "../helpers/makeGameDetails";
import {filterMultiplayer} from "../../src/domain/filterMultiplayer";
import type {GameDetails} from "../../src/domain/gameDetails";

describe("filterMultiplayer", () => {
    const games = [
        makeGameDetails({ id: "1", isMultiplayer: true }),
        makeGameDetails({ id: "2", isMultiplayer: false }),
        makeGameDetails({ id: "3", isMultiplayer: true }),
    ];
    it("garde les jeux multijoueur", () => {
        const result = filterMultiplayer(games);

        expect(result.map(game => game.id)).toEqual(["1","3"])
    });
    it("retire les jeux solo", () => {
        const result = filterMultiplayer(games);

        expect(result.map(game => game.id)).not.toContain("2");
    });
    it("renvoie un tableau vide si la liste est vide", () => {
        const emptyGames : GameDetails[] = [] ;
        const result = filterMultiplayer(emptyGames);

        expect(result).toEqual([]);
    });
});