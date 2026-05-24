function maxJumps(arr: number[], d: number): number {

    const dp = new Map<number, number>();

    function solve(idx:number):number{


        let result = 1;
        // If the result is already calculated, return it.
        if(dp.has(idx)){
            return dp.get(idx)!;
        }


        // Check the left side for possible jumps
        for(let i = idx-1; i>=Math.max(0, idx-d); i--){
            if(arr[i] >= arr[idx]){
                break;
            }
            result = Math.max(result, 1+solve(i));
        }

        // Check the right side for possible jumps
        for(let i = idx+1; i<=Math.min(arr.length-1, idx+d); i++){
            if(arr[i] >= arr[idx]){
                break;
            }
            result = Math.max(result, 1+solve(i));
        }


        dp.set(idx, result);
        return result;
    }


    let result:number = 0;
    for(let i = 0; i<arr.length; i++){
        result = Math.max(result, solve(i))
    } 

    return result; 
};

// Example usage:
const arr = [6,4,14,6,8,13,9,7,10,6,12];
const d = 2;
console.log(maxJumps(arr, d)); // 4