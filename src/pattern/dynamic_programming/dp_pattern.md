# Dynamic Programming Patterns

> A revision guide for the most common DP templates. Master the 5 patterns and you can recognize and solve nearly any DP problem on LeetCode.

---

## The Core Idea

DP solves problems with **overlapping subproblems** and **optimal substructure** by storing results so they're never recomputed.

| Pattern | State definition | Decision |
|---|---|---|
| **1D Linear** | `dp[i]` = answer for first `i` elements | Take or skip current element |
| **2D Grid** | `dp[i][j]` = answer for subgrid | Move right, down, or diagonal |
| **Knapsack** | `dp[i][w]` = best value with `i` items, weight `w` | Include or exclude item `i` |
| **LCS / LIS** | `dp[i][j]` or `dp[i]` | Match or skip characters/elements |
| **Interval** | `dp[i][j]` = answer for range `[i, j]` | Split range at every possible midpoint |

---

## Method 1 — 1D Linear DP

`dp[i]` depends only on previous entries. Classic examples: house robber, climbing stairs, max subarray.

```
House Robber: nums = [2, 7, 9, 3, 1]

dp[0] = 2
dp[1] = max(2, 7) = 7
dp[2] = max(dp[1], dp[0]+9) = max(7, 11) = 11
dp[3] = max(dp[2], dp[1]+3) = max(11, 10) = 11
dp[4] = max(dp[3], dp[2]+1) = max(11, 12) = 12
Answer = 12
```

### TypeScript Implementation — House Robber

```typescript
function rob(nums: number[]): number {
    if (nums.length === 1) return nums[0];

    const dp = new Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        // Either skip house i, or rob it (can't rob i-1)
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[nums.length - 1];
}
```

**Space-optimized** (only need last two values):

```typescript
function rob(nums: number[]): number {
    let prev2 = 0;
    let prev1 = 0;

    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}
```

### TypeScript Implementation — Climbing Stairs (Fibonacci DP)

```typescript
function climbStairs(n: number): number {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}
```

---

## Method 2 — 2D Grid DP

`dp[i][j]` = answer for reaching cell `(i, j)`. Transitions come from above `dp[i-1][j]` or left `dp[i][j-1]`.

```
Unique Paths: 3x3 grid

dp[0][*] = 1  (only one way along top row)
dp[*][0] = 1  (only one way along left column)

dp[1][1] = dp[0][1] + dp[1][0] = 2
dp[1][2] = dp[0][2] + dp[1][1] = 3
dp[2][1] = dp[1][1] + dp[2][0] = 3
dp[2][2] = dp[1][2] + dp[2][1] = 6
```

### TypeScript Implementation — Unique Paths

```typescript
function uniquePaths(m: number, n: number): number {
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}
```

### TypeScript Implementation — Minimum Path Sum

```typescript
function minPathSum(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    dp[0][0] = grid[0][0];

    // Fill first row
    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    // Fill first column
    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
}
```

---

## Method 3 — 0/1 Knapsack

For each item, decide: **include it** (move diagonally in DP table) or **exclude it** (copy from row above).

```
weights = [1, 2, 3],  values = [6, 10, 12],  capacity W = 5

      w=0  w=1  w=2  w=3  w=4  w=5
i=0:   0    6    6    6    6    6    (item 0: weight=1, val=6)
i=1:   0    6   10   16   16   16   (item 1: weight=2, val=10)
i=2:   0    6   10   16   18   22   (item 2: weight=3, val=12)

dp[2][5] = 22 ✓  (take items 0+2: 6+12=18? Wait: 6+10+? No: weights 1+2+3=6>5)
Actually: take item 1 (val 10) + item 2 (val 12) = 22, weight 2+3=5 ✓
```

### TypeScript Implementation — 0/1 Knapsack

```typescript
function knapsack(weights: number[], values: number[], W: number): number {
    const n = weights.length;
    // dp[i][w] = max value using first i items with capacity w
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            // Option 1: don't take item i
            dp[i][w] = dp[i - 1][w];

            // Option 2: take item i (only if it fits)
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }

    return dp[n][W];
}
```

**1D space-optimized** (iterate w from right to left!):

```typescript
function knapsack(weights: number[], values: number[], W: number): number {
    const dp = new Array(W + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        for (let w = W; w >= weights[i]; w--) {  // RIGHT TO LEFT — prevents reuse
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[W];
}
```

**Why right to left?** Each item should only be used once. Going right-to-left ensures `dp[w - weight[i]]` still holds the value from the *previous* item's row.

---

## Method 4 — Longest Common Subsequence (LCS)

`dp[i][j]` = LCS length of `s1[0..i-1]` and `s2[0..j-1]`.

```
s1 = "ABCBDAB",  s2 = "BDCAB"

     ""  B  D  C  A  B
""    0  0  0  0  0  0
A     0  0  0  0  1  1
B     0  1  1  1  1  2
C     0  1  1  2  2  2
B     0  1  1  2  2  3
D     0  1  2  2  2  3
A     0  1  2  2  3  3
B     0  1  2  2  3  4

LCS length = 4 ("BCAB" or "BDAB")
```

### TypeScript Implementation — LCS

```typescript
function lcs(s1: string, s2: string): number {
    const m = s1.length, n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;   // characters match → extend LCS
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // take best without one char
            }
        }
    }

    return dp[m][n];
}
```

### TypeScript Implementation — Longest Increasing Subsequence (LIS)

```typescript
function lengthOfLIS(nums: number[]): number {
    const dp = new Array(nums.length).fill(1);  // every element is a LIS of length 1

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}
// O(n²) — for O(n log n) use patience sorting with binary search
```

---

## Method 5 — Interval DP

`dp[i][j]` = answer for the subproblem on range `[i, j]`. Fill by increasing interval length.

```
Burst Balloons: nums = [3, 1, 5, 8]

dp[i][j] = max coins by bursting all balloons between i and j (exclusive boundaries)
Pad: [1, 3, 1, 5, 8, 1]

For each length l, for each i, j = i+l:
  Try every k as the LAST balloon to burst in (i,j):
  dp[i][j] = max over k of: dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]
```

### TypeScript Implementation — Burst Balloons

```typescript
function maxCoins(nums: number[]): number {
    const padded = [1, ...nums, 1];
    const n = padded.length;
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    // Fill by increasing gap length
    for (let len = 2; len < n; len++) {
        for (let left = 0; left < n - len; left++) {
            const right = left + len;
            for (let k = left + 1; k < right; k++) {
                dp[left][right] = Math.max(
                    dp[left][right],
                    dp[left][k] + padded[left] * padded[k] * padded[right] + dp[k][right]
                );
            }
        }
    }

    return dp[0][n - 1];
}
```

---

## Memoization vs Tabulation

```
Memoization (Top-Down)              Tabulation (Bottom-Up)
─────────────────────               ─────────────────────
Start from the big problem          Start from base cases
Recurse, cache results in map       Fill table iteratively
Natural to write                    Usually faster (no call stack)
Only computes needed states         Computes all states
Use: complex state spaces           Use: simple state, want O(1) space optimization

Template:
  const memo = new Map()
  function dp(i, ...): number {
    if (base case) return ...
    if (memo.has(key)) return memo.get(key)
    const result = ... recursive calls ...
    memo.set(key, result)
    return result
  }
```

---

## Quick-Pick Template Guide

```
"Max/min if you can take or skip each element"
    → 1D Linear DP (house robber style)

"Count ways to reach step n / coin change"
    → 1D DP, dp[i] += dp[i - coin] for each coin

"Path through a grid (count paths / min cost)"
    → 2D Grid DP

"Subset sum / partition equal subset / target sum"
    → 0/1 Knapsack (boolean or count variant)

"Longest common subsequence / edit distance"
    → LCS 2D DP

"Longest increasing subsequence"
    → LIS 1D DP (O(n²)) or patience sort (O(n log n))

"Palindrome partitioning / matrix chain / burst balloons"
    → Interval DP, fill by increasing length
```

---

## The DP Contract

```
1. DEFINE   — what does dp[i] or dp[i][j] represent? (be precise)
2. BASE     — fill base cases first (dp[0], first row/column)
3. RECUR    — write the recurrence relation clearly
4. ORDER    — fill in the correct order so dependencies are ready
5. RETURN   — which cell/value is the answer?
```

The most common bug: not defining what `dp[i]` means precisely before writing the recurrence.

---

*Time complexity: O(n) — 1D Linear, O(n²) — LCS/LIS/Knapsack, O(n³) — Interval DP. Space can often be reduced from O(n²) to O(n) by keeping only the current and previous rows.*
