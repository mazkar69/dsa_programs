function findMaxAverage(nums: number[], k: number): number {
    if(nums.length === 1)return nums[0];

    let left = 0; 
    let max = Number.MIN_SAFE_INTEGER;

    let sum = 0;
    
    for(let i = 0; i<nums.length; i++){
        let currentSum = sum;
        currentSum += nums[i];

        if(i - left >= k){
            currentSum -= nums[left];
            left++;
            max = Math.max(max, currentSum);
        }

        sum = currentSum;

    }

    return nums.length === k ? sum/k : max/k;
};

// Eample Usages:
console.log(findMaxAverage([9,7,3,5,6,2,0,8,1,9], 6)); // Output: 5.33333