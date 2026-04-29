function reorderedPowerOf2(n: number): boolean {
  function sortAndJoin(num: number): string {
    return num.toString().split("").sort().join("");
  }

  // First find all the power and store in map, then check if the sorted string of n is in the map or not.
  const powerOf2Map: Map<string, boolean> = new Map();
  for (let i = 0; i < 31; i++) {
    const powerOf2: number = Math.pow(2, i);
    powerOf2Map.set(sortAndJoin(powerOf2), true);
  }

  if (powerOf2Map.has(sortAndJoin(n))) {
    return true;
  } else {
    return false;
  }
}

reorderedPowerOf2(152);
