// function removeDuplicates(nums: number[]): number {
        
//     let len = nums.length;
//     for(let i = 1; i<len;){
//         if(nums[i] === nums[i-1]){
//             // Shift the element
//             for(let j = i; j < len-1; j++){
//                 nums[j] = nums[j+1]
//             }
//             len--;
//         }else{
//             i++;
//         }
//     }

//     return nums.length - (nums.length - len);
// };


// function removeDuplicates(nums: number[]): number {
//    const sortedList = new Set(nums);
//    let index = 0;
//    for(let num of sortedList){
//     nums[index] = num;
//     index++;
//    }
//     return sortedList.size;
// };

function removeDuplicates(nums: number[]): number {
    let index = 0; 
    const map = new Map<number,boolean>()
    map.set(nums[0], true)

    for(let i = 1; i < nums.length; i++){
        if(!map.has(nums[i])){
            nums[++index] = nums[i];
            map.set(nums[i],true)
        }
    }
    return index + 1;
};