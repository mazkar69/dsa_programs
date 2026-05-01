function maxPathScore(grid: number[][], k: number): number {
  const memo = new Map<string, number>();

  function dfs(row: number, col: number, k: number): number {
    if (row >= grid.length || col >= grid[0].length) return -1;

    const value = grid[row][col];
    const cost = value === 0 ? 0 : 1;

    if (k < cost) return -1;

    const newK = k - cost;
    const key = `${row},${col},${newK}`;

    if (memo.has(key)) return memo.get(key)!;

    // last cell
    if (row === grid.length - 1 && col === grid[0].length - 1) {
      return value;
    }

    const right = dfs(row, col + 1, newK);
    const down = dfs(row + 1, col, newK);

    let result = -1;
    if (right !== -1 || down !== -1) {
      result = value + Math.max(right, down);
    }

    memo.set(key, result);
    return result;
  }

  return dfs(0, 0, k);
}

// Example usage:
console.log(
  maxPathScore(
    [
      [0, 2, 2],
      [1, 1, 1],
      [0, 0, 2],
    ],
    3,
  ),
); // Output: -1
