import type { GameDetails } from "../../src/domain/gameDetails";

// Un jeu « normal » par défaut ; chaque test ne précise que ce qui change
export function makeGameDetails(overrides: Partial<GameDetails> = {}): GameDetails {
    return {
        id: "1",
        name: "Jeu de test",
        price: { kind: "paid", finalCents: 1000, initialCents: 1000, discountPercent: 0 },
        isMultiplayer: true,
        genres: [],
        status: "released",
        ...overrides,
    };
}