function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    
    let set = new Set<number>();

    for(let num of arr1){

        while(num){

            if(!set.has(num) && num !== 0){
                set.add(num);
            }

            num = Math.floor(num / 10)
        }
    }

    let longestPrefix = 0;

    for(let num of arr2){

        while(num){

            if(set.has(num)){
                longestPrefix = Math.max(longestPrefix, Math.floor(Math.log10(num)) + 1);
                break;
            }
            num = Math.floor(num / 10)
        }
    }

    return longestPrefix;
        
};

// Example usage:
const arr1 = [1, 10, 100];
const arr2 = [1000];
console.log(longestCommonPrefix(arr1, arr2)); // 3