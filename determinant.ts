export default function determinant(mat: number[][]): number {
    if (mat.length === 1) {
        return mat[0][0];
    }
    if (mat.length === 2) {
        return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
    }
    let sum = 0;
    for (let activeX = 0; activeX < mat.length; activeX += 1) {
        const minor = [...Array(mat.length - 1)].map(() =>
            Array(mat.length - 1),
        );
        for (let y = 1; y < mat.length; y += 1) {
            for (let x = 0, minorX = 0; x < mat.length; x += 1) {
                if (x === activeX) {
                    continue;
                }
                minor[y - 1][minorX] = mat[y][x];
                minorX += 1;
            }
        }
        sum +=
            mat[0][activeX] * determinant(minor) * (activeX % 2 === 0 ? 1 : -1);
    }
    return sum;
}
