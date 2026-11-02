import { describe, it, expect } from "vitest";
import { toGameDetails } from "../../../src/adapters/steam/toGameDetails";
import { makeSteamAppData } from "../../helpers/makeSteamAppData";

describe("toGameDetails", () => {
    it("reprend l'id et le nom", () => {
        const data = makeSteamAppData({name : "Portal"});

        const result = toGameDetails("620", data);
        expect(result.id).toBe("620");
        expect(result.name).toBe("Portal");
    });
    // Prix
    it("renvoie un prix payant avec les montants en centimes et la réduction", () => {
        const data = makeSteamAppData();
        const result = toGameDetails("620", data);


        expect(result.price).toEqual({
            kind: "paid",
            finalCents: 1000,
            initialCents: 2000,
            discountPercent: 50,
        });
    });
    it("renvoie un prix gratuit si is_free vaut true", () => {
        const data = makeSteamAppData({is_free: true});
        const result = toGameDetails("570", data);

        expect(result.price).toEqual({kind : "free"})
    });
    it("renvoie un prix inconnu si price_overview est absent et le jeu n'est pas gratuit", () => {
        const { price_overview: _, ...data } = makeSteamAppData();
        const result = toGameDetails("570", data);

        expect(result.price).toEqual({kind : "unknown"})
    });

    // Multijoueur
    it("indique multijoueur si une catégorie multijoueur ou coop est présente", () => {
        const data = makeSteamAppData({ categories: [
                    { id: 2, description: "Solo" },
                    { id: 9, description: "Coop" },
                ]});
        const result = toGameDetails("570", data)

        expect(result.isMultiplayer).toBe(true);
    });
    it("indique solo si aucune catégorie multijoueur n'est présente", () => {
        const data = makeSteamAppData();
        const result = toGameDetails('570', data)

        expect(result.isMultiplayer).toBe(false);
    });

    it("indique solo si les catégories sont absentes", () => {
        const { categories: _, ...data } = makeSteamAppData();
        const result = toGameDetails("570", data)

        expect(result.isMultiplayer).toBe(false);
    });

    // Genres
    it.todo("renvoie les noms des genres");
    it.todo("renvoie une liste vide si les genres sont absents");

    // Statut
    it.todo("renvoie released pour un jeu sorti");
    it.todo("renvoie coming_soon si le jeu n'est pas encore sorti");
    it.todo("renvoie early_access si le genre Accès anticipé est présent");
});