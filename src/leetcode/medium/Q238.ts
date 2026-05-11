function productExceptSelf(nums: number[]): number[] {
  const len: number = nums.length;
  const leftProduct: number[] = new Array(len).fill(1);
  const rightProduct: number[] = new Array(len).fill(1);
  const answer: number[] = new Array(len).fill(1);

  for (let i = 1; i < len; i++) {
    leftProduct[i] = leftProduct[i - 1] * nums[i - 1];
  }

  for (let i = len - 2; i >= 0; i--) {
    rightProduct[i] = rightProduct[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < len; i++) {
    answer[i] = leftProduct[i] * rightProduct[i];
  }

  return answer;
}
