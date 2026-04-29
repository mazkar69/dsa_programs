// Dynamic Programming - Iterative approach (bottom-up)
function rob(nums: number[]): number {
    let prev1 = 0; // Max money that can be robbed up to the previous house
    let prev2 = 0; // Max money that can be robbed up to the house before the previous one

    nums.forEach((num) => {
        const current = Math.max(prev1, prev2 + num); // Max money if we rob the current house or skip it
        prev2 = prev1;
        prev1 = current;
    });

    return prev1;
}
// Using recurrence with memoization (top-down approach)
// function rob(nums: number[]): number {
//     const memo: number[] = new Array(nums.length).fill(-1);

//     function helper(i: number): number {
//         if (i < 0) return 0;
//         if (memo[i] !== -1) return memo[i];

//         const robCurrent = nums[i] + helper(i - 2);
//         const skipCurrent = helper(i - 1);
        
//         memo[i] = Math.max(robCurrent, skipCurrent);
//         return memo[i];
//     }

//     return helper(nums.length - 1);
// }



// 
// Example usage:
console.log(rob([1, 2, 3, 1])); // Output: 4
// console.log(rob([2, 7, 9, 3, 1])); // Output: 12