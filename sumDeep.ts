type NestedNumberArray = Array<number | NestedNumberArray>;

/** checks if value is array */
function isNestedNumberArray(
    value: number | NestedNumberArray,
): value is NestedNumberArray {
    return Array.isArray(value);
}

/**
 * sums all numbers in array including nested arrays,\
 * array must consist only of numbers and other arrays of same type
 */
export default function sumDeep(arr: NestedNumberArray): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i += 1) {
        const item = arr[i];
        if (isNestedNumberArray(item)) {
            sum += sumDeep(item);
        } else {
            sum += item;
        }
    }
    return sum;
}
