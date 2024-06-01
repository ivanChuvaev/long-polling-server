/**
 * returns index of element found in arr, using binary search   
 * array must be sorted in ascending order,   
 * if there is duplicates, then it will return index of first duplicate
 */
export default function binarySearch(
    arr: number[],
    element: number
): number | undefined {
    let left = -1;
    let right = arr.length;
    let center: number;
    while (right - left > 1) {
        center = Math.floor((left + right) / 2);
        if (arr[center] === element) {
            while (center > 0 && arr[center - 1] === element) {
                center -= 1;
            }
            return center;
        }
        if (element > arr[center]) {
            left = center;
            continue;
        }
        right = center;
    }
    return undefined;
}
