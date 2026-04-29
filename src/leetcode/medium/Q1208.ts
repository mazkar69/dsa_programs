function equalSubstring(s: string, t: string, maxCost: number): number {
  let left = 0;
  let cost = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));

    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// console.log(equalSubstring("krrgw", "zjxss", 19)); 
// console.log(equalSubstring("pxezla", "loewbi", 25)); 