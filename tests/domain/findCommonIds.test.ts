import {describe, expect, it} from "vitest";
import {findCommonIds} from "../../src/domain/findCommonIds";

describe("findCommonIds", () => {
    it("renvoie les ids présents dans les deux listes", () => {

        const wishlistA = ["1","2"];
        const wishlistB = ["2", "99"];

        const result = findCommonIds(wishlistA, wishlistB);

        expect(result).toEqual(["2"]);
    });
    it("renvoie un tableau vide s'il n'y a aucun id en commun", () => {

        const wishlistA = ["1","4"];
        const wishlistB = ["2", "99"];

        const result = findCommonIds(wishlistA, wishlistB);

        expect(result).toEqual([])
    });
    it("renvoie un tableau vide si une des listes est vide", () => {
        const wishlistA: string[] = [];
        const wishlistB = ["2", "99"];

        const result = findCommonIds(wishlistA, wishlistB);

        expect(result).toEqual([])
    });
    it("conserve l'ordre de la première liste", () => {
        const wishlistA = ["1","4", "2"];
        const wishlistB = ["4", "2", "1", "99"];

        const result = findCommonIds(wishlistA, wishlistB);

        expect(result).toEqual(["1","4","2"])
    });
});