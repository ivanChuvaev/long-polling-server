/** removes consequtive duplicates */
export default function removeConsecutiveDuplicates(
    str: number[] | string[] | string,
) {
    const marks = Array(str.length).fill(true);
    let count = str.length;
    for (let i = 1; i < str.length; i += 1) {
        if (str[i] === str[i - 1]) {
            marks[i] = false;
            count -= 1;
        }
    }
    const output = Array(count);
    let k = 0;
    for (let i = 0; i < str.length; i += 1) {
        if (marks[i]) {
            output[k] = str[i];
            k += 1;
        }
    }
    return output;
}
