function searchInsert(nums: number[], target: number): number {
    let index:number = 0;
    for(index; index < nums.length; index++){
        if(nums[index] >= target) index;
    }
    return index;
};