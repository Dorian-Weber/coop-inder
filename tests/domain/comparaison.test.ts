import {describe, expect, it} from "vitest";
import {compareProfiles, type Profile} from "../../src/domain/comparaison";
import {makeGame} from "../helpers/makeGame";

describe("compareProfiles", () => {
    const profileA : Profile = {
        library: [makeGame(1, "Portal"), makeGame(2, "Terraria"), makeGame(4, "Enshrouded")],
        wishlist: ["3", "6", "7"],
    };
    const profileB : Profile = {
        library: [makeGame(3, "Celeste"), makeGame(2, "Terraria")],
        wishlist: ["4", "6", "99"],
    };
    const emptyProfile : Profile = {
        library: [],
        wishlist: [],
    };


    it("remplit commonGames avec les jeux possédés par les deux", () => {

        const result = compareProfiles(profileA, profileB);

        expect(result.commonGames).toEqual([{id: "2",name : "Terraria" }]);
    });
    it("remplit ownedByAWishedByB avec les jeux de A présents dans la wishlist de B", () => {
        const result = compareProfiles(profileA, profileB);

        expect(result.ownedByAWishedByB).toEqual([{id: "4",name : "Enshrouded" }]);
    });
    it("remplit ownedByBWishedByA avec les jeux de B présents dans la wishlist de A", () => {
        const result = compareProfiles(profileA, profileB);

        expect(result.ownedByBWishedByA).toEqual([{id: "3",name : "Celeste" }]);
    });
    it("remplit sharedWishlist avec les ids présents dans les deux wishlists", () => {
        const result = compareProfiles(profileA, profileB);

        expect(result.sharedWishlist).toEqual(["6"]);
    });
    it("renvoie quatre listes vides si les deux profils sont vides", () => {
        const result = compareProfiles(emptyProfile, emptyProfile);

        expect(result.commonGames).toEqual([]);
        expect(result.ownedByBWishedByA).toEqual([]);
        expect(result.ownedByAWishedByB).toEqual([]);
        expect(result.sharedWishlist).toEqual([])
    });
});