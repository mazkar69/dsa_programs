// function rotatedDigits(n: number): number {
//   let count: number = 0;

//   function isGood(num: number): boolean {
//     let isValid: boolean = false;

//     while (num > 0) {
//       let digit: number = num % 10;

//       if (digit === 3 || digit === 4 || digit === 7) return false;

//       if (digit === 2 || digit === 5 || digit === 6 || digit === 9)
//         isValid = true;

//       num = Math.floor(num / 10);
//     }

//     return isValid;
//   }

//   for (let i = 1; i <= n; i++) {
//     if (isGood(i)) {
//       count++;
//     }
//   }

//   return count;
// }

//USING RECURSION || YET TO SOLVE USING ITERATION
function rotatedDigits(n: number): number {
  let count: number = 0;

  function isGood(num:number):boolean {
    if (num === 0) return true;
    
    let digit: number = num % 10;
    if (digit === 3 || digit === 4 || digit === 7) return false;
    let isValid: boolean = digit === 2 || digit === 5 || digit === 6 || digit === 9;

    let restIsGood: boolean = isGood(Math.floor(num / 10));

    return isValid && restIsGood;
  }

  for (let i = 1; i <= n; i++) {
    if (isGood(i)) {
      count++;
    }
  }
  return count;
}

// Example usage:
console.log(rotatedDigits(10)); // Output: 4
