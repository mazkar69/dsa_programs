// function uniquePaths(m: number, n: number): number {
    
//     const map = new Map<string,number>();


//     function solve(r,c){
//         if(r === m || c === n) return 0;
//         if(r === m-1 && c === n-1)return 1;

//         if(map.has(`${r},${c}`)){
//             return map.get(`${r},${c}`)
//         }
        
//         let sum:number = solve(r+1,c) + solve(r,c+1);
//         map.set(`${r},${c}`, sum)
//         return sum;
//     }

//    return solve(0,0);
// };

function uniquePaths(m: number, n: number): number {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
        }
    }

    return dp[m - 1][n - 1];
}