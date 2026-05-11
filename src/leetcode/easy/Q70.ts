function climbStairs(n: number): number {
    
    const map = new Map<number,number>()

    function solve(n:number):number{
        if(n === 1 || n === 2){
            return n;
        }
        if(map.has(n)){
            return map.get(n)!;
        }    
        let sum:number = solve(n-1) + solve(n-2);

        map.set(n,sum);
        return sum;
    }
    return solve(n);
};

// This is a type of fibonacci series problem, We can solve this using bottom up approach.