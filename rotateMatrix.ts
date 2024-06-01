function transpose(mat: number[][]) {
    const output = [...Array(mat[0].length)].map(() => Array(mat.length));
    for (let y = 0; y < mat.length; y += 1) {
        for (let x = 0; x < mat[0].length; x += 1) {
            output[x][y] = mat[y][x];
        }
    }
    return output;
}

export function rotateMatrixClockwise(mat: number[][]) {
    const output = transpose(mat);
    for (let i = 0; i < output.length; i += 1) {
        output[i] = output[i].reverse();
    }
    return output;
}

export function rotateMatrixCounterClockwise(mat: number[][]) {
    const output = transpose(mat);
    for (let x = 0; x < output[0].length; x += 1) {
        const reversedColumn = [...Array(output.length)].map(
            (_, i) => output[output.length - i - 1][x],
        );
        console.log(reversedColumn);
        for (let y = 0; y < output.length; y += 1) {
            output[y][x] = reversedColumn[y];
        }
    }
    return output;
}

export default function rotateMatrix(
    mat: number[][],
    clockwise: boolean = true,
) {
    return clockwise
        ? rotateMatrixClockwise(mat)
        : rotateMatrixCounterClockwise(mat);
}
