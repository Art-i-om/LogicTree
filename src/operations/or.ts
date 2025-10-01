export function or(values: boolean[]): boolean {
    for (let bool of values) {
        if (bool) return true;
    }

    return false;
}