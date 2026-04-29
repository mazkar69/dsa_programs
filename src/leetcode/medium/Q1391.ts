function hasValidPath(grid: number[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    type dir = [number, number];
    const dirs: Record<number, dir[]> = {
        1: [[0, -1], [0, 1]],
        2: [[-1, 0], [1, 0]],
        3: [[0, -1], [1, 0]],
        4: [[0, 1], [1, 0]],
        5: [[0, -1], [-1, 0]],
        6: [[0, 1], [-1, 0]],
    };


    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    const queue = [[0, 0]];
    visited[0][0] = true;

    while (queue.length) {
        const [r, c] = queue.shift()!;

        if (r === m - 1 && c === n - 1) return true;

        for (const [dr, dc] of dirs[grid[r][c]]) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
            if (visited[nr][nc]) continue;

            // check reverse connection
            if (dirs[grid[nr][nc]].some(([dr2, dc2]) => nr + dr2 === r && nc + dc2 === c)) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    return false;
}

console.log(hasValidPath([[2,4,3],[6,5,2]])); // true
console.log(hasValidPath([[1,2,1],[1,2,1]])); 