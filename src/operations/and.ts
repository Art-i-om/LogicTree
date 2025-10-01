export function and(values: boolean[]): boolean {
    for (let bool of values) {
        if (!bool) return false;
    }

    return true;
}