function longestPalindrome(s: string): string {
  const len: number = s.length;
  let str: string = "";
  let maxLength: number = 0;

  // using recurrence with memoization (top-down approach)
  const memo = new Map<string, boolean>();
  function isPalindrome(i: number, j: number): boolean {
    if (i >= j) return true; // Base case: single character or empty string is a palindrome
    if (s[i] !== s[j]) return false; // If characters at i and j are different, it's not a palindrome
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key)!; // Return cached result if available

    const result = isPalindrome(i + 1, j - 1); // Check the inner substring
    memo.set(key, result);
    return result;
  }

  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      const length = j - i + 1;
      if (length > maxLength && isPalindrome(i, j)) {
        // Check the length and save
        maxLength = length;
        str = s.slice(i, j + 1);
      }
    }
  }

  return str;
}

// Example usage:
console.log(longestPalindrome("babad")); // Output: "aba" or "bab"
console.log(longestPalindrome("cbbd")); // Output: "bb"
