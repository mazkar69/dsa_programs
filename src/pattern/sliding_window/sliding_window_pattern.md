# Sliding Window Patterns

> A revision guide for fixed and variable sliding window templates. Master these and you can solve any "contiguous subarray / substring" problem in O(n).

---

## The Core Idea

Instead of recalculating from scratch for every subarray (O(n²)), a sliding window **reuses** the previous window's result by adding the new right element and removing the old left element.

| Pattern | Window size | When to shrink |
|---|---|---|
| **Fixed Window** | Always exactly `k` | When window size exceeds `k` |
| **Variable — Max Window** | Grows until invalid | Shrink until valid again |
| **Variable — Min Window** | Shrinks as soon as valid | Record, then shrink immediately |

---

## Method 1 — Fixed Size Window

Window always stays exactly `k` elements wide. Slide right one step at a time.

```
nums = [2, 1, 5, 1, 3, 2],  k = 3

Window [2,1,5]  sum=8
Window [1,5,1]  sum=7  (subtract 2, add 1)
Window [5,1,3]  sum=9  (subtract 1, add 3)  ← max
Window [1,3,2]  sum=6
Answer = 9
```

### TypeScript Implementation

```typescript
function maxSumFixedWindow(nums: number[], k: number): number {
    let windowSum = 0;
    let maxSum = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];                     // expand right

        if (right >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= nums[right - k + 1];         // shrink left (remove oldest)
        }
    }

    return maxSum;
}
```

**Key insight:** `right - k + 1` is always the leftmost element of the current window.

---

## Method 2 — Variable Window: Maximize (Longest Valid)

Expand `right` freely. When the window becomes **invalid**, shrink `left` until it's valid again. Track the **maximum** size seen while valid.

```
s = "abcabcbb",  find longest substring without repeating chars

r=0 add 'a'  window=[a]         valid  len=1
r=1 add 'b'  window=[ab]        valid  len=2
r=2 add 'c'  window=[abc]       valid  len=3
r=3 add 'a'  window=[abca]      INVALID (dup 'a')
    shrink: remove 'a' l=1  window=[bca]   valid  len=3
r=4 add 'b'  window=[bcab]      INVALID (dup 'b')
    shrink: remove 'b' l=2  window=[cab]   valid  len=3
...
Answer = 3
```

### TypeScript Implementation

```typescript
function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>();  // char → last index
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];

        // If char was seen and is inside the current window → shrink
        if (seen.has(ch) && seen.get(ch)! >= left) {
            left = seen.get(ch)! + 1;
        }

        seen.set(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

**General template for "longest valid window":**

```typescript
function longestValid(nums: number[]): number {
    let left = 0;
    let maxLen = 0;
    // window state (sum, count, map, etc.)

    for (let right = 0; right < nums.length; right++) {
        // 1. ADD nums[right] to window state

        while (/* window is INVALID */) {
            // 2. REMOVE nums[left] from window state
            left++;
        }

        // 3. Window is valid — update answer
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

---

## Method 3 — Variable Window: Minimize (Shortest Valid)

Expand `right` until the window **becomes valid**. Then shrink `left` as much as possible while still valid, recording the minimum each time.

```
s = "ADOBECODEBANC",  t = "ABC"

Expand until window contains A, B, C:
→ window "ADOBEC" (r=5)  valid! record len=6
Shrink from left:
→ remove 'A', window "DOBEC" → missing A, stop. best=6

Expand right:
→ "DOBECODEBA" (found another A)
→ "DOBECODEBANC" (found another C, now has A,B,C) valid! record len=12? No wait...

[The algorithm handles this step by step, always recording before shrinking]
Answer = "BANC" (len=4)
```

### TypeScript Implementation

```typescript
function minWindow(s: string, t: string): string {
    const need = new Map<string, number>();
    for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);

    let have = 0;
    const required = need.size;   // distinct chars needed
    const window = new Map<string, number>();

    let left = 0;
    let minLen = Infinity;
    let resLeft = 0;

    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        window.set(ch, (window.get(ch) ?? 0) + 1);

        // Did this character satisfy its required count?
        if (need.has(ch) && window.get(ch) === need.get(ch)) have++;

        // Shrink while window is valid
        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                resLeft = left;
            }
            const leftCh = s[left];
            window.set(leftCh, window.get(leftCh)! - 1);
            if (need.has(leftCh) && window.get(leftCh)! < need.get(leftCh)!) have--;
            left++;
        }
    }

    return minLen === Infinity ? "" : s.slice(resLeft, resLeft + minLen);
}
```

**General template for "shortest valid window":**

```typescript
function shortestValid(nums: number[]): number {
    let left = 0;
    let minLen = Infinity;
    // window state

    for (let right = 0; right < nums.length; right++) {
        // 1. ADD nums[right] to window state

        while (/* window IS valid */) {
            // 2. UPDATE minimum answer
            minLen = Math.min(minLen, right - left + 1);
            // 3. REMOVE nums[left] from window state
            left++;
        }
    }

    return minLen === Infinity ? 0 : minLen;
}
```

---

## Side-by-Side Comparison

```
Fixed Window               Variable (Max/Longest)     Variable (Min/Shortest)
─────────────────────      ─────────────────────      ─────────────────────
Window size = k            Expand freely              Expand until valid
Shrink: right - k + 1      Shrink WHILE invalid       Shrink WHILE valid
Record: every iteration    Record after shrinking      Record before shrinking
  (once window full)         right - left + 1           right - left + 1
```

---

## Quick-Pick Template Guide

```
"Maximum sum subarray of size k"
    → Fixed Window

"Longest substring/subarray with constraint (at most k distinct, no repeats, etc.)"
    → Variable Window — Maximize (shrink when invalid)

"Minimum window substring / shortest subarray satisfying condition"
    → Variable Window — Minimize (shrink while valid, record before shrinking)

"Number of subarrays with exactly k (matching)"
    → atMost(k) - atMost(k-1)  trick using Variable Max template

"Maximum number of consecutive 1s after flipping at most k zeros"
    → Variable Max, count zeros in window, shrink when zeros > k
```

---

## The Sliding Window Contract

```
1. EXPAND   — always move right pointer forward each iteration
2. SHRINK   — move left pointer when window violates the constraint
3. RECORD   — track max/min at the correct moment:
               • Maximize → record AFTER shrinking (window is valid)
               • Minimize → record BEFORE shrinking (window just became valid)
```

The most common bug: recording the answer at the wrong moment (before vs after shrinking).

---

*Time complexity: O(n) — each element enters and leaves the window at most once. Space: O(k) or O(alphabet size) for the auxiliary map/set.*
