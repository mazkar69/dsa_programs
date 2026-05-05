function longestConsecutive(nums: number[]): number {
  if (!nums.length) {
    return 0;
  }
  nums.sort((a, b) => a - b);

  let max: number = 0;
  let current: number = 0;

  for (let i = 1; i < nums.length; i++) {
    const diff: number = nums[i] - nums[i - 1];

    if (diff > 1) {
      current = 0;
    } else if (diff == 1) {
      current = current + 1;
      max = Math.max(max, current);
    }
  }

  return max + 1;
}

// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9
// Explanation: The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Therefore its length is 9.

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
