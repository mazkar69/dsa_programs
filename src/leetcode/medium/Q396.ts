function maxRotateFunction(nums: number[]): number {
  const n = nums.length;

  if (n <= 1) return 0;

  let sum = 0;
  let f0 = 0;

  // Step 1: calculate sum and F(0)
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    f0 += i * nums[i];
  }

  let max = f0;
  let curr = f0;

  // Step 2: use relation
  for (let k = 1; k < n; k++) {
    curr = (curr + sum) - n * nums[n - k];
    max = Math.max(max, curr);
  }

  return max;
}
// Example usage:
console.log(maxRotateFunction([4, 3, 2, 6])); // Output: 26
