function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  const auxArr = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    const charCode: number = s.charCodeAt(i);
    const index: number = charCode - 97;
    auxArr[index] = auxArr[index] + 1;
  }

  for (let i = 0; i < t.length; i++) {
    const charCode: number = t.charCodeAt(i);
    const index: number = charCode - 97;

    if (auxArr[index]) {
      auxArr[index] = auxArr[index] - 1;
    } else {
      return false;
    }
  }

  return true;
}
