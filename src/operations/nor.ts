export function nor(values: boolean[]): boolean {
    for (let bool of values) {
        if (bool) return false;
    }

    return true;
}