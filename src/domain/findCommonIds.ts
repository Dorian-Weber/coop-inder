export function findCommonIds(idsA: string[], idsB: string[]): string[] {
    return idsA.filter((id) =>
        idsB.includes(id));

}