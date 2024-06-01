export default function transposeMatrix(mat: number[][]) {
    const output = [...Array(mat[0].length)].map(() => Array(mat.length));
    for (let y = 0; y < mat.length; y += 1) {
        for (let x = 0; x < mat[0].length; x += 1) {
            output[x][y] = mat[y][x];
        }
    }
    return output;
}
