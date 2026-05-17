function findMin(nums: number[]): number {
    
    let left:number = 0;
    let right:number = nums.length-1;

    while(left < right){
        let mid:number = Math.floor(left + (right-left)/2);
        if(nums[mid] > nums[right]){
            left = mid + 1;
        }else if(nums[mid] < nums[right]){
            right = mid - 1;
        }else{
            right = mid;
        }
    }

    return nums[left];
};


// console.log(findMin([3,4,5,1,2]));
console.log(findMin([2,2,2,0,1]));
console.log(findMin([3,1,1]));