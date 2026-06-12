function waysToSplitArray(nums: number[]): number {
    
    // left presum
    let leftPrefixSum:number[] = [];
    leftPrefixSum.push(nums[0]);
    for(let i = 1; i < nums.length-1; i++){
        leftPrefixSum.push(leftPrefixSum[i-1] + nums[i]);
    }

    // right presum
    let rightPrefixSum:number[] = new Array(nums.length-1);
    rightPrefixSum[nums.length-2] = nums[nums.length - 1];
    for(let i = nums.length-3; i >= 0; i--){
        rightPrefixSum[i] = rightPrefixSum[i+1] + nums[i+1];
    }

    let splitCount:number = 0;
    for(let i = 0; i<leftPrefixSum.length; i++){
        if(leftPrefixSum[i] > rightPrefixSum[i]) splitCount++;
    }


    return splitCount;
};

// Example use case
console.log(waysToSplitArray([10,4,-8,7])); // Output: 2