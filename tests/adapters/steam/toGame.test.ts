import {describe, it, expect} from "vitest";
import type {SteamOwnedGame} from "../../../src/adapters/steam/types";
import {toGame} from "../../../src/adapters/steam/toGame";


function makeSteamGame(appid: number, name: string): SteamOwnedGame {
    return {appid, name, playtime_forever: 120, img_icon_url: "abc", rtime_last_played: 0};
}

describe("toGame", () => {
    it("convertit l'appid Steam en id de type string", () => {

            const game1 = makeSteamGame(1, "Portal");
            const result = toGame(game1);

            expect(result.id).toBe("1");
        }
    );
    it("reprend le nom du jeu", () => {

        const game1 = makeSteamGame(1, "Portal");
        const result = toGame(game1);

        expect(result.name).toBe("Portal");
    });
    it("ne garde que les champs de Game", () => {

        const game1 = makeSteamGame(1, "Portal");
        const result = toGame(game1);

        expect(result).toEqual({id: "1", name: "Portal"});
    });
});