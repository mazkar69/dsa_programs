


// // Catalan numbers using dynamic programming approach
// function findCatalonNumber(num:number):void{
//     let result:number[] = [1,1]

//     for(let i = 2; i<=10; i++){

//         let total:number = 0;

//         for(let j = 0; j < i; j++){
//             total += result[j] * result[i-1-j]
//         }
//         result[i] = total
//     }

//     for(let i = 0; i < num; i++){
//         console.log(result[i])
//     }
// }

// // Example usage:
// findCatalonNumber(10)



// Using recursion with memoization
function findCatalonNumberMemo(num:number, memo:Record<number, number> = {}):number{
    if(num in memo) return memo[num]
    if(num <= 1) return 1
    
    let total = 0
    for(let i = 0; i < num; i++){
        total += findCatalonNumberMemo(i, memo) * findCatalonNumberMemo(num - 1 - i, memo)
    }
    memo[num] = total
    return total
}

// Example usage:
for(let i = 0; i < 10; i++){
    console.log(findCatalonNumberMemo(i))
}