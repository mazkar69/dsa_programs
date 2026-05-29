function canReach(s: string, minJump: number, maxJump: number): boolean {
    
    let n:number=s.length;


    for(let i = 0; i<n-1;){

        if(i + maxJump >= n-1){
            return true;
        }


        let nextJump:number = 0;
        for(let j = i+minJump; j<= Math.min(i+maxJump, n-1); j++){
            if(s[j] === "0"){
                nextJump = j;
            }
        }
        
        if(nextJump >= n-1){
            return true;
        }else if(nextJump > i){
            i = nextJump;
        }else{
            return false;
        }
    }

    return false;
};


// Example usage:
console.log(canReach("011010", 2, 3)); // Output: true
// console.log(canReach("01101110", 2, 3)); // Output: false