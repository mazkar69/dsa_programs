function strStr(haystack: string, needle: string): number {
  const haystackLen: number = haystack.length;
  const needleLen: number = needle.length;

  let needlePointer: number = 0;
  let index: number = 0;

  for (index; index < haystackLen; index++) {
    let ch: string = haystack[index];

    if (needlePointer == needleLen) {
      break;
    }
    if (ch === needle[needlePointer]) {
      needlePointer = needlePointer + 1;
    } else {
      needlePointer = 0;
    }
  }

  return index - needlePointer;
}

// Example usage:
console.log(strStr("hello", "ll")); // Output: 2
