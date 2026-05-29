# Prefix Sum Patterns

> A revision guide for 1D, 2D, and HashMap-based prefix sum templates. Master these and you can answer any subarray/submatrix sum query in O(1) after O(n) preprocessing.

---

## The Core Idea

A **prefix sum** array stores the cumulative sum up to each index. Any subarray sum `[l, r]` can then be computed in O(1) using:

$$\text{sum}(l, r) = \text{prefix}[r+1] - \text{prefix}[l]$$

| Pattern | What to precompute | Query |
|---|---|---|
| **1D Prefix Sum** | `prefix[i]` = sum of first `i` elements | `prefix[r+1] - prefix[l]` |
| **2D Prefix Sum** | `prefix[i][j]` = sum of rectangle (0,0) to (i,j) | Inclusion-exclusion |
| **HashMap + Prefix** | Map of {sum → count} | Count subarrays with given sum |

---

## Method 1 — 1D Prefix Sum

Build once, answer range queries in O(1).

```
nums = [1, 2, 3, 4, 5]

prefix = [0, 1, 3, 6, 10, 15]
          ↑
          extra 0 at the front simplifies boundary conditions

sum(1, 3) = prefix[4] - prefix[1] = 10 - 1 = 9  ✓ (2+3+4)
sum(0, 4) = prefix[5] - prefix[0] = 15 - 0 = 15 ✓
```

### TypeScript Implementation — Range Sum Query

```typescript
class NumArray {
    private prefix: number[];

    constructor(nums: number[]) {
        this.prefix = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }

    // Sum of nums[left..right] inclusive
    sumRange(left: number, right: number): number {
        return this.prefix[right + 1] - this.prefix[left];
    }
}
```

---

## Method 2 — HashMap Prefix Sum: Count Subarrays with Target Sum

**Key insight:** If `prefix[j] - prefix[i] = target`, then `prefix[i] = prefix[j] - target`.  
So as we compute `prefix[j]`, we ask: *how many times has `prefix[j] - target` appeared before?*

```
nums = [1, 1, 1],  target = 2

prefix[0] = 0  → map={0:1}
prefix[1] = 1  → check map[1-2]=-1 → not in map → count+=0. map={0:1, 1:1}
prefix[2] = 2  → check map[2-2]=0 → in map! count+=1. map={0:1, 1:2, 2:1}
prefix[3] = 3  → check map[3-2]=1 → in map! count+=2. map={0:1, 1:2, 2:1, 3:1}

Answer = 3  (subarrays: [1,1] at 0-1, [1,1] at 1-2, whole array won't work — wait:
Actually: [1,1] at indices 0-1, [1,1] at indices 1-2, and... 
count after prefix[2]=1, count after prefix[3]=1+2=3. Correct! [0..1],[1..2],[0..2 has sum 3 nope])
Hmm let me re-check: nums=[1,1,1] target=2
Subarrays with sum 2: [1,1](0-1), [1,1](1-2) → count=2... 
Actually the correct answer is 2. Let me recount:
prefix[3]=3, map has 1:2 (from indices 0 and 1), 3-2=1 → count += map[1] = 2. Total = 0+1+2 = ... wait:
- i=1: prefix=1, need map[1-2]= map[-1]=0 → count=0
- i=2: prefix=2, need map[2-2]=map[0]=1 → count=1  
- i=3: prefix=3, need map[3-2]=map[1]=1 → count=2
Answer = 2 ✓
```

### TypeScript Implementation — Subarray Sum Equals K

```typescript
function subarraySum(nums: number[], k: number): number {
    const map = new Map<number, number>();
    map.set(0, 1);  // empty prefix (sum=0) seen once

    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;

        // How many prefixes ended at sum = prefixSum - k?
        count += map.get(prefixSum - k) ?? 0;

        map.set(prefixSum, (map.get(prefixSum) ?? 0) + 1);
    }

    return count;
}
```

---

## Method 3 — Subarray Sum Divisible by K

Same idea but bucket by `prefix % k`. Two subarrays have sum divisible by k if they have the **same remainder**.

```
nums = [4, 5, 0, -2, -3, 1],  k = 5

prefix remainders: [0, 4, 4, 4, 2, 4, 0]
                    ↑ initial 0

remainder=0 appears 2 times → C(2,2) = 1 pair
remainder=4 appears 4 times → C(4,2) = 6 pairs
remainder=2 appears 1 time  → 0 pairs
Answer = 7
```

### TypeScript Implementation

```typescript
function subarraysDivByK(nums: number[], k: number): number {
    const map = new Map<number, number>();
    map.set(0, 1);

    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;
        let rem = ((prefixSum % k) + k) % k;  // handle negative mods in JS

        count += map.get(rem) ?? 0;
        map.set(rem, (map.get(rem) ?? 0) + 1);
    }

    return count;
}
```

---

## Method 4 — 2D Prefix Sum

`prefix[i][j]` = sum of rectangle from `(0, 0)` to `(i-1, j-1)` (using 1-indexed prefix).

```
matrix:
1 2 3
4 5 6
7 8 9

prefix (1-indexed, extra row/col of 0):
 0  0  0  0
 0  1  3  6
 0  5 12 21
 0 12 27 45

Sum of (1,1) to (2,2) (0-indexed → 2,2 to 3,3 in prefix):
= prefix[3][3] - prefix[1][3] - prefix[3][1] + prefix[1][1]
= 45 - 6 - 12 + 1 = 28  ✓ (5+6+8+9=28)
```

### TypeScript Implementation — 2D Range Sum Query

```typescript
class NumMatrix {
    private prefix: number[][];

    constructor(matrix: number[][]) {
        const m = matrix.length, n = matrix[0].length;
        this.prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                this.prefix[i][j] =
                    matrix[i - 1][j - 1]
                    + this.prefix[i - 1][j]
                    + this.prefix[i][j - 1]
                    - this.prefix[i - 1][j - 1];  // subtract double-counted corner
            }
        }
    }

    // Sum of rectangle (r1,c1) to (r2,c2) — 0-indexed
    sumRegion(r1: number, c1: number, r2: number, c2: number): number {
        return this.prefix[r2 + 1][c2 + 1]
             - this.prefix[r1][c2 + 1]
             - this.prefix[r2 + 1][c1]
             + this.prefix[r1][c1];
    }
}
```

**Memory aid for inclusion-exclusion:**
```
whole  - top strip  - left strip  + top-left corner (added back)
P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
```

---

## Method 5 — Prefix XOR (Subarray XOR Problems)

Same pattern as prefix sum but with XOR. `xor(l, r) = prefix[r+1] ^ prefix[l]` (because `a ^ a = 0`).

```typescript
function countSubarraysWithXOR(nums: number[], target: number): number {
    const map = new Map<number, number>();
    map.set(0, 1);

    let prefixXor = 0;
    let count = 0;

    for (const num of nums) {
        prefixXor ^= num;

        // prefixXor ^ prefix[i] = target  →  prefix[i] = prefixXor ^ target
        count += map.get(prefixXor ^ target) ?? 0;
        map.set(prefixXor, (map.get(prefixXor) ?? 0) + 1);
    }

    return count;
}
```

---

## Side-by-Side Comparison

```
1D Range Query             HashMap Count              2D Range Query
─────────────────────      ─────────────────────      ─────────────────────
prefix[i+1] = prefix[i]+n  map: {sum → count}         prefix[i][j] = 4-term sum
query: P[r+1] - P[l]       add P-k before updating    query: inclusion-exclusion
O(1) query after O(n) build count += map[P - k]        O(1) query after O(mn) build
```

---

## Quick-Pick Template Guide

```
"Range sum query (multiple queries on static array)"
    → 1D Prefix Sum, build once query in O(1)

"Count subarrays with sum = k"
    → HashMap prefix sum, map[prefix - k] before storing prefix

"Count subarrays with sum divisible by k"
    → HashMap on prefix % k, handle negative remainder: (rem + k) % k

"Minimum size subarray with sum >= target"
    → Sliding Window (not prefix) for O(n)

"2D range sum query (submatrix sums)"
    → 2D Prefix Sum with inclusion-exclusion formula

"Count subarrays with XOR = k"
    → Prefix XOR + HashMap, same pattern as subarray sum

"Longest subarray with sum = k"
    → HashMap: store first occurrence of each prefix sum, check prefix - k
```

---

## The Prefix Sum Contract

```
1. BUILD   — prefix[0] = 0 (sentinel), prefix[i+1] = prefix[i] + nums[i]
2. QUERY   — sum(l, r) = prefix[r+1] - prefix[l]
3. HASHMAP — map stores {prefixSum → count}; check map BEFORE updating
4. INIT    — always seed map with {0: 1} to handle subarrays starting from index 0
```

The most common bug: forgetting to initialize the map with `{0: 1}` — this causes subarrays starting from index 0 to be missed.

---

*Time complexity: O(n) build, O(1) query for 1D. O(mn) build, O(1) query for 2D. O(n) for HashMap prefix sum counting. Space: O(n) or O(mn).*
