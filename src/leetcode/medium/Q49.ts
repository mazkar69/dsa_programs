function groupAnagrams(strs: string[]): string[][] {
  const track = new Array(26).fill(0);
  function getKey(str: string): string {
    for (let i = 0; i < str.length; i++) {
      const ascaiiVal: number = str.charCodeAt(i);
      track[ascaiiVal - 97] = track[ascaiiVal - 97] + 1;
    }

    let key = "";

    for (let i = 0; i < 26; ) {
      if (track[i]) {
        key = key + String.fromCharCode(97 + i);
        track[i] = track[i] - 1;
      } else {
        i++;
      }
    }

    return key;
  }

  const map = new Map<string, string[]>();
  for (let i = 0; i < strs.length; i++) {
    const key: string = getKey(strs[i]);
    if (map.has(key)) {
      map.get(key)?.push(strs[i]);
    } else {
      map.set(key, [strs[i]]);
    }
  }

  return Array.from(map.values());
}

// Example usage:
const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
const result = groupAnagrams(input);
console.log(result);
