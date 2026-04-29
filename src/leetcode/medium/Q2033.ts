function minOperations(grid: number[][], x: number): number {
  const flatGrid: number[] = grid.flat();

  const remainder = flatGrid[0] % x;
  for (let num of flatGrid) {
    if (num % x !== remainder) return -1;
  }

  // Sort the flatGrid
  flatGrid.sort((a, b) => a - b);

  const middleIndex = Math.floor(flatGrid.length / 2);

  const middleValue = flatGrid[middleIndex];

  let count: number = 0;
  
  for (let val of flatGrid) {
    count += Math.abs(val - middleValue) / x;
  }

  return count;
}

