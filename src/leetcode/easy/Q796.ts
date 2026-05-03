function rotateString(s: string, goal: string): boolean {
  let sLen: number = s.length;
  let goalLen: number = goal.length;

  if (goalLen !== sLen) {
    return false;
  }

  for (let i: number = 0; i < sLen; i++) {
    let pointer: number = i;
    let j: number = 0;
    for (j = 0; j < goalLen; j++) {
      if (s[pointer] !== goal[j]) {
        break;
      }
      pointer = Math.floor((pointer + 1) % sLen);
    }

    if (j === goalLen) {
      return true;
    }
  }

  return false;
}

// Example usage:
console.log(rotateString("abcde", "cdeab")); // Output: true
console.log(rotateString("abcde", "abced")); // Output: false
console.log(rotateString("aa", "a")); // Output: false
