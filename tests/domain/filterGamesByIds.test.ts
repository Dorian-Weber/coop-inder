import {describe, expect, it} from "vitest";
import {filterGamesByIds} from "../../src/domain/filterGamesByIds";
import { makeGame} from "../helpers/makeGame"

describe("filterGamesByIds", () => {
    it("garde les jeux dont l'id figure dans la liste", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const wishlistB = ["2", "99"];

        const result = filterGamesByIds(gamesA, wishlistB);

        expect(result.map(game => game.id)).toEqual(["2"]);
    });
    it("renvoie un tableau vide si la liste d'ids est vide", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const wishlistB : string[] = [];

        const result = filterGamesByIds(gamesA, wishlistB);

        expect(result.map(game => game.id)).toEqual([]);
    });
    it("ignore les ids qui ne correspondent à aucun jeu", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const wishlistB = ["4", "99"];

        const result = filterGamesByIds(gamesA, wishlistB);

        expect(result.map(game => game.id)).toEqual([]);
    });
    it("conserve l'ordre de la liste de jeux", () => {

        const gamesA = [makeGame(3, "Celeste"), makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const wishlistB = ["1", "2", "3"];

        const result = filterGamesByIds(gamesA, wishlistB);

        expect(result.map(game => game.id)).toEqual(["3", "1", "2"]);
    });
});