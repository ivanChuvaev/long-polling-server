/**
 * divides array to subarrays of same length equal to `count` except for last one,\
 * it's length may be less or equal to `count`
 * */
function chunks<T>(arr: T[], count: number): T[][] {
    const output = Array(Math.ceil(arr.length / count));
    for (let i = 0; i < output.length; i += 1) {
        output[i] = arr.slice(i * count, (i + 1) * count);
    }
    return output;
}
