import {describe, it, expect} from "vitest";
import {findCommonGames} from "../../src/domain/findCommonGames";
import type {SteamOwnedGame} from "../../src/adapters/steam/types";

// fonction utilitaire pour fabriquer un faux jeu sans tout réécrire
function makeGame(appid: number, name: string): SteamOwnedGame {
    return {appid, name, playtime_forever: 0, img_icon_url: "", rtime_last_played: 0};
}

describe("findCommonGames", () => {
    it("renvoie les jeux présents dans les deux bibliothèques", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.appid)).toEqual([2]);
    });

    it("renvoie un tableau vide s'il n'y a aucun jeu en commun", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(4, "Enshourded"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.appid)).toEqual([]);
    });
    it("renvoie un tableau vide si la liste A est vide", () => {

        const gamesA: SteamOwnedGame[] = [];
        const gamesB = [makeGame(4, "Enshrouded"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.appid)).toEqual([]);
    });
    it("renvoie un tableau vide si la liste B est vide", () => {

        const gamesA = [makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB: SteamOwnedGame[] = [];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.appid)).toEqual([]);
    });
    it("conserve l'ordre de la liste A", () => {

        const gamesA = [makeGame(3, "Celeste"), makeGame(1, "Portal"), makeGame(2, "Terraria")];
        const gamesB = [makeGame(1, "Portal"), makeGame(2, "Terraria"), makeGame(3, "Celeste")];

        const result = findCommonGames(gamesA, gamesB);

        expect(result.map(game => game.appid)).toEqual([3, 1, 2]);
    });
});

describe("findMissingGames", () => {
    it.todo("renvoie les jeux de A que B ne possède pas");
    it.todo("renvoie toute la liste A si B est vide");
    it.todo("renvoie un tableau vide si B possède tous les jeux de A");
});