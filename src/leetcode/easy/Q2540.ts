
function getCommon(nums1: number[], nums2: number[]): number {
    
    let i:number = 0;
    let j:number = 0;

    while(i < nums1.length && j<nums2.length){
        if(nums1[i] === nums2[j]){
            return nums1[i];
        }else if(nums1[i] < nums2[j]){
            i++;
        }else{
            j++;
        }
    }
    return -1;
};

// Example usage:
console.log(getCommon([1,2,3,6], [2,3,4,5])) // Output: 2
// console.log(getCommon([1,2,3,6], [2,3,4,5])) // Output: 2


