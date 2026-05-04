function rotate(matrix: number[][]): void {
  const len: number = matrix[0].length;
  const size: number = len - 1;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    for (let j = 0; j < len - i * 2 - 1; j++) {
      const temp = matrix[i][i + j];
      matrix[i][i + j] = matrix[size - i - j][i]; // left → top
      matrix[size - i - j][i] = matrix[size - i][size - i - j]; // bottom → left
      matrix[size - i][size - i - j] = matrix[i + j][size - i]; // right → bottom
      matrix[i + j][size - i] = temp; // top → right
    }
  }
}
