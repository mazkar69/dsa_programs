function isSubsequence(s: string, t: string): boolean {
  if (!s) return true;
  let sPointer: number = 0;
  for (let i = 0; i < t.length; i++) {
    if (s[sPointer] == t[i]) {
      sPointer++;

      if (sPointer >= s.length) {
        return true;
      }
    }
  }
  return false;
}
