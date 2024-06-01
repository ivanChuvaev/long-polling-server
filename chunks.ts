function chunks<T>(arr: T[], count: number): T[][] {
    const output = Array(Math.ceil(arr.length / count));
    for (let i = 0; i < output.length; i += 1) {
        output[i] = arr.slice(i * count, (i + 1) * count);
    }
    return output;
}
