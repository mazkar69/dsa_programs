function singleNumber(nums: number[]): number {
    // const bucket = new Set<number>();

    // for(let i = 0; i<nums.length; i++){
    //     if(bucket.has(nums[i])){
    //         bucket.delete(nums[i])
    //     }else{
    //         bucket.add(nums[i])
    //     }
    // }

    // return [...bucket].pop();

    return nums.reduce((acc, num) => acc ^ num, 0);
};