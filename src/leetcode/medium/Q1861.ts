function rotateTheBox(boxGrid: string[][]): string[][] {
  let rowLen: number = boxGrid.length;
  let colLen: number = boxGrid[0].length;
  let newGrid: string[][] = new Array(colLen)
    .fill(null)
    .map(() => new Array(rowLen).fill("."));

  for (let i = 0; i < rowLen; i++) {
    let p = colLen;

    for (let j = colLen - 1; j >= 0; j--) {
      const ch = boxGrid[i][j];

      if (ch === "*") {
        // Obstacle
        p = j;
      } else if (ch === "#" && boxGrid[i][p] === ".") {
        // Stone
        // Replace
        boxGrid[i][p] = "#";
        boxGrid[i][j] = ".";
        p--;
      } else if (ch === "." && (p === colLen || boxGrid[i][p] === "*")) {
        // Empty
        p = j;
      }
    }
  }

  console.log(boxGrid);

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      newGrid[j][rowLen - 1 - i] = boxGrid[i][j];
    }
  }

  return newGrid;
}

// Example 1:
// Input: box = [["#",".","#"]]
// Output: [["."],["#"],["#"]]
// Explanation: The box is rotated 90 degrees clockwise, and the stone falls down due to gravity.
// Example 2:
// Input: box = [["#",".","*","."],["#","#","*","."]]
// Output: [["."],["#"],["#"]]
// Explanation: The box is rotated 90 degrees clockwise, and the stones fall down due to gravity. The obstacle stays in the same position.

console.log(
  rotateTheBox([["#","#","#",".","#","."]]),
);

// [
//   [".", "#", "#"],
//   [".", "#", "#"],
//   ["#", "#", "*"],
//   ["#", "*", "."],
//   ["#", ".", "*"],
//   ["#", ".", "."],
// ];
