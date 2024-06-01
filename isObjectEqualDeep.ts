/** deep comparison of two objects or arrays */
export default function isObjectEqualDeep(a: any, b: any) {
    if (typeof a !== typeof b) {
        return false;
    }
    if (a === null) {
        return b === null;
    }
    if (typeof a !== 'object') {
        return a === b;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    aKeys.sort((a, b) => a.localeCompare(b));
    bKeys.sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < aKeys.length; i += 1) {
        if (aKeys[i] !== bKeys[i]) {
            return false;
        }
    }
    for (const key of aKeys) {
        if (!isObjectEqualDeep(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
