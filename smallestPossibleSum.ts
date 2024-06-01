/** unoptimized @deprecated */
export default function smallestPossibleSum(arr: number[]) {
    let i = 0;
    while (i < arr.length) {
        const less = arr.find((item) => arr[i] > item);
        if (less) {
            arr[i] = arr[i] - less;
            i = 0;
            continue;
        }
        i += 1;
    }
    return arr.reduce((value, sum) => sum + value);
}
