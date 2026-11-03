import {describe, it, expect} from "vitest";
import {makeGameDetails} from "../helpers/makeGameDetails";
import {sortByPrice} from "../../src/domain/sortByPrice";

describe("sortByPrice", () => {
    it("trie les jeux payants du moins cher au plus cher", () => {
        const games = [
            makeGameDetails({id: "2", price: {kind: "paid", finalCents: 1500, initialCents: 1500, discountPercent: 0}}),
            makeGameDetails({id: "4", price: {kind: "paid", finalCents: 1000, initialCents: 1000, discountPercent: 0}}),
            makeGameDetails({id: "5", price: {kind: "paid", finalCents: 500, initialCents: 1000, discountPercent: 50}})
        ]
        const result = sortByPrice(games);
        expect(result.map(game => game.id)).toEqual(["5", "4", "2"])
    });
    it("place les jeux gratuits avant les jeux payants", () => {
        const games = [
            makeGameDetails({id: "2", price: {kind: "paid", finalCents: 1500, initialCents: 1500, discountPercent: 0}}),
            makeGameDetails({id: "1", price: {kind: "free"}}),
        ]
        const result = sortByPrice(games)
        expect(result.map(game => game.id)).toEqual(["1", "2"])
    });
    it("place les jeux au prix inconnu après les jeux payants", () => {
        const games = [
            makeGameDetails({id: "3", price: {kind: "unknown"}}),
            makeGameDetails({id: "2", price: {kind: "paid", finalCents: 1500, initialCents: 1500, discountPercent: 0}}),
        ]
        const result = sortByPrice(games)
        expect(result.map(game => game.id)).toEqual(["2", "3"])
    });
    it("tri les jeux de manière a avoir free, paid, unknown et paid en ordre croissant.", () => {
        const games = [
            makeGameDetails({id: "3", price: {kind: "unknown"}}),
            makeGameDetails({id: "1", price: {kind: "free"}}),
            makeGameDetails({id: "2", price: {kind: "paid", finalCents: 1500, initialCents: 1500, discountPercent: 0}}),
            makeGameDetails({id: "4", price: {kind: "paid", finalCents: 1000, initialCents: 1000, discountPercent: 0}}),
            makeGameDetails({id: "5", price: {kind: "paid", finalCents: 500, initialCents: 1000, discountPercent: 50}})
        ];
        const result = sortByPrice(games);
        expect(result.map(game => game.id)).toEqual(["1", "5", "4", "2", "3"])
    });
    it("ne modifie pas le tableau d'origine", () => {
        const games = [
            makeGameDetails({id: "3", price: {kind: "unknown"}}),
            makeGameDetails({id: "1", price: {kind: "free"}}),
        ];
        const before = [...games];   // copie de l'ordre initial

        sortByPrice(games);

        expect(games).toEqual(before);
    });
});