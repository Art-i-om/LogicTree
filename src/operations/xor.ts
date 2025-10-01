export function xor(values: boolean[]): boolean {
    let seen: Set<boolean> = new Set<boolean>();

    for (let bool of values) {
        seen.add(bool);
        if (seen.size == 2) {
            return true;
        }
    }

    return false;
}