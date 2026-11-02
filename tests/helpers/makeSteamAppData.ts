import type { SteamAppData } from "../../src/adapters/steam/types";

// Un jeu Steam « normal » par défaut ; chaque test ne précise que ce qui change
export function makeSteamAppData(overrides: Partial<SteamAppData> = {}): SteamAppData {
    return {
        name: "Jeu de test",
        is_free: false,
        price_overview: { currency: "EUR", initial: 2000, final: 1000, discount_percent: 50 },
        categories: [{ id: 2, description: "Solo" }],
        genres: [{ id: "1", description: "Action" }],
        release_date: { coming_soon: false, date: "1 janv. 2020" },
        ...overrides,
    };
}