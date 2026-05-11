function lengthOfLongestSubstring(s: string): number {
  const bucket = new Set<string>();
  let n: number = s.length;
  if (n === 1 || n === 0) return n;

  let max: number = 1;
  let p: number = 0;
  bucket.add(s[0]);

  for (let i = 1; i < n; i++) {
    if (bucket.has(s[i])) {
      while (s[p] !== s[i]) {
        bucket.delete(s[p]);
        p++;
      }
      p++;
    } else {
      bucket.add(s[i]);
      max = Math.max(max, i - p + 1);
    }
  }
  return max;
}

// Use casese
// console.log(lengthOfLongestSubstring("abcabcbb"));

console.log(lengthOfLongestSubstring("tmmzuxt"));
