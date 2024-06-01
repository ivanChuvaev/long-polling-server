export default function getDuplicates(str: string) {
    const map = new Map<string, boolean>();
    for (let i = 0; i < str.length; i += 1) {
        if (map.has(str[i])) {
            map.set(str[i], true);
        } else {
            map.set(str[i], false);
        }
    }
    return Array.from(map.entries())
        .filter(([c, isDuplicate]) => isDuplicate)
        .map(([c]) => c);
}
