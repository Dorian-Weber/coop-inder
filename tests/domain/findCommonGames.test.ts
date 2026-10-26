import {describe, it, expect} from "vitest";
import {findCommonGames, findMissingGames } from "../../src/domain/findCommonGames";
import type {Game} from "../../src/domain/game";

// fonction utilitaire pour fabriquer un faux jeu sans tout réécrire
function makeGame(id: number, name: string): Game {
    return {id: String(id), name};
}

describe("findCommonGames", () => {
    it("renvoie les jeux présents dans les deux bibliothèques", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual(["2"]);
    });

    it("renvoie un tableau vide s'il n'y a aucun jeu en commun", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(4, "Enshourded"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual([]);
    });
    it("renvoie un tableau vide si la liste A est vide", () => {

        const gamesA: Game[] = [];
        const gamesB = [makeGame(4, "Enshrouded"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual([]);
    });
    it("renvoie un tableau vide si la liste B est vide", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB: Game[] = [];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual([]);
    });
    it("conserve l'ordre de la liste A", () => {

        const gamesA = [makeGame(3, "Celeste"), makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(1, "Portal"), makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual(["3", "1", "2"]);
    });
});

describe("findMissingGames", () => {
    it("renvoie les jeux de A que B ne possède pas", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findMissingGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual(["1"]);
    });
    it("renvoie toute la liste A si B est vide", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB: Game[] = [];

        const result = findMissingGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual(["1","2"]);
    });
    it("renvoie un tableau vide si B possède tous les jeux de A", () => {
        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(1, "Portal"), makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findMissingGames(gamesA, gamesB);

        expect(result.map(game => game.id)).toEqual([]);
    });
});