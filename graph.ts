/** implementation of Graph */
class Graph {
    private matrix: number[][];
    private vertices: string[];
    constructor() {
        this.matrix = [[]];
        this.vertices = [];
    }

    addVertex(vertexName: string) {
        this.vertices.push(vertexName);
        if (this.matrix[0].length === 0) {
            this.matrix[0].push(0);
            return;
        }
        for (let i = 0; i < this.matrix.length; i += 1) {
            this.matrix[i].push(0);
        }
        this.matrix.push(Array(this.matrix.length + 1).fill(0));
    }

    addEdge(firstVertexName: string, secondVertexName: string) {
        const firstIndex = this.vertices.indexOf(firstVertexName);
        const secondIndex = this.vertices.indexOf(secondVertexName);
        if (firstIndex === -1) {
            throw new Error(`Cannot find ${firstVertexName}`);
        }
        if (secondIndex === -1) {
            throw new Error(`Cannot find ${secondVertexName}`);
        }
        this.matrix[firstIndex][secondIndex] = 1;
        this.matrix[secondIndex][firstIndex] = 1;
    }

    getVertexDegree(vertexName: string) {
        const vertexIndex = this.vertices.indexOf(vertexName);
        if (vertexIndex === -1) {
            throw new Error(`Cannot find ${vertexName}`);
        }
        return this.matrix[vertexIndex].reduce((sum, value) => sum + value);
    }

    getGraphOrder() {
        return this.vertices.length;
    }

    getGraphSize() {
        let sum = 0;
        for (let i = 1; i < this.matrix.length; i += 1) {
            for (let j = 0; j < i; j += 1) {
                sum += this.matrix[i][j];
            }
        }
        return sum;
    }

    private getConnectedVertices(vertexIndex: number): number[] {
        return this.matrix[vertexIndex]
            .map((c, i) => [i, c])
            .filter(([_, c]) => c === 1)
            .map(([i, _]) => i);
    }

    dfs(vertexName: string) {
        const vertexIndex = this.vertices.indexOf(vertexName);
        if (vertexIndex === -1) {
            throw new Error(`Cannot find ${vertexName}`);
        }
        const stack: number[] = [vertexIndex];
        const marks: Set<number> = new Set([vertexIndex]);
        const output: string[] = [];
        while (stack.length !== 0) {
            const current = stack.pop()!;
            output.push(this.vertices[current]);
            const vertices = this.getConnectedVertices(current).filter(
                (v) => !marks.has(v)
            );
            for (let i = 0; i < vertices.length; i += 1) {
                marks.add(vertices[i]);
            }
            stack.push(...vertices);
        }
        return output;
    }

    bfs(vertexName: string) {
        const vertexIndex = this.vertices.indexOf(vertexName);
        if (vertexIndex === -1) {
            throw new Error(`Cannot find ${vertexName}`);
        }
        const queue: number[] = [vertexIndex];
        const marks: Set<number> = new Set([vertexIndex]);
        const output: string[] = [];
        while (queue.length !== 0) {
            const current = queue.shift()!;
            output.push(this.vertices[current]);
            const vertices = this.getConnectedVertices(current).filter(
                (v) => !marks.has(v)
            );
            for (let i = 0; i < vertices.length; i += 1) {
                marks.add(vertices[i]);
            }
            queue.push(...vertices);
        }
        return output;
    }

    print() {
        const pad = 3;
        console.log(
            this.vertices[0].padStart(pad * 2 + 1, " "),
            this.vertices
                .slice(1)
                .map((v) => v.padStart(pad, " "))
                .join(" ")
        );
        for (let i = 0; i < this.matrix.length; i += 1) {
            console.log(
                this.vertices[i].padStart(pad, " "),
                this.matrix[i]
                    .map((v) => v.toString().padStart(pad, " "))
                    .join(" ")
            );
        }
    }
}

// Example of usage

// const graph = new Graph();

// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");
// graph.addVertex("G");

// graph.addEdge("A", "B");
// graph.addEdge("A", "C");
// graph.addEdge("B", "C");
// graph.addEdge("C", "E");
// graph.addEdge("F", "G");

// graph.print();

// console.log("graph order", graph.getGraphOrder());
// console.log("graph size", graph.getGraphSize());
// console.log("graph depth-first search from A", graph.dfs("A"));
// console.log("graph breadth-first search from A", graph.bfs("A"));
// console.log("graph dfs from D", graph.dfs("D"));
// console.log("graph dfs from F", graph.dfs("F"));
