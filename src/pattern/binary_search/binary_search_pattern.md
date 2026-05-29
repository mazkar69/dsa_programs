# Binary Search Patterns

> A revision guide for the three fundamental binary search templates. Master these and you can solve almost any "sorted array / search space" problem.

---

## The Core Idea

Binary search **eliminates half the search space** on every step. The key is identifying *what invariant* your `left` and `right` pointers maintain.

| Pattern | What you're searching | Key decision |
|---|---|---|
| **Classic** | Exact value in sorted array | `mid == target?` |
| **Left Boundary** | First position where condition is true | Push `right` left when found |
| **Right Boundary** | Last position where condition is true | Push `left` right when found |
| **Search Space** | Minimum/maximum feasible value | Binary search on answer |

---

## Method 1 — Classic Binary Search

Find an exact target. If not present, return `-1`.

```
nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23

Step 1: lo=0  hi=9  mid=4  nums[4]=16  < 23 → lo = mid+1 = 5
Step 2: lo=5  hi=9  mid=7  nums[7]=56  > 23 → hi = mid-1 = 6
Step 3: lo=5  hi=6  mid=5  nums[5]=23 == 23 → return 5
```

### TypeScript Implementation

```typescript
function binarySearch(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);  // avoids integer overflow

        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) lo = mid + 1;   // target is in right half
        else hi = mid - 1;                            // target is in left half
    }

    return -1;  // not found
}
```

**Why `lo + (hi - lo) / 2` instead of `(lo + hi) / 2`?**  
`lo + hi` can overflow when both are large integers. The safe form is always preferred.

---

## Method 2 — Left Boundary (First True)

Find the **first index** where `condition(mid)` is `true`. Think of the array as `[F, F, F, T, T, T]` — you want the first `T`.

```
nums = [1, 2, 2, 2, 3, 4]
target = 2  (find leftmost 2)

lo=0 hi=5 mid=2 nums[2]=2 == target → save ans=2, hi=mid-1=1  (keep searching left)
lo=0 hi=1 mid=0 nums[0]=1 < target  → lo=mid+1=1
lo=1 hi=1 mid=1 nums[1]=2 == target → save ans=1, hi=mid-1=0
lo=1 hi=0  → loop ends, return ans=1  ✓
```

### TypeScript Implementation

```typescript
function leftBoundary(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;
    let ans = -1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] === target) {
            ans = mid;       // record candidate
            hi = mid - 1;   // but keep searching LEFT for an earlier one
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return ans;
}
```

---

## Method 3 — Right Boundary (Last True)

Find the **last index** where `condition(mid)` is `true`. Array looks like `[T, T, T, F, F, F]` — you want the last `T`.

```
nums = [1, 2, 2, 2, 3, 4]
target = 2  (find rightmost 2)

lo=0 hi=5 mid=2 nums[2]=2 == target → save ans=2, lo=mid+1=3  (keep searching right)
lo=3 hi=5 mid=4 nums[4]=3 > target  → hi=mid-1=3
lo=3 hi=3 mid=3 nums[3]=2 == target → save ans=3, lo=mid+1=4
lo=4 hi=3  → loop ends, return ans=3  ✓
```

### TypeScript Implementation

```typescript
function rightBoundary(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;
    let ans = -1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] === target) {
            ans = mid;       // record candidate
            lo = mid + 1;   // but keep searching RIGHT for a later one
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return ans;
}
```

---

## Method 4 — Binary Search on Answer (Search Space)

When the problem asks **"find the minimum/maximum X such that condition holds"**, binary search on the answer itself — not on an array index.

**Template:**

```
[possible values of X]  →  [F, F, F, T, T, T]  (find first T = minimum valid X)
                       or  [T, T, T, F, F, F]  (find last T  = maximum valid X)
```

### Example: Minimum days to make M bouquets (LeetCode 1482)

```typescript
function minDays(bloomDay: number[], m: number, k: number): number {
    if (m * k > bloomDay.length) return -1;  // impossible

    // Check if we can make m bouquets in `days` days
    function canMake(days: number): boolean {
        let bouquets = 0;
        let consecutive = 0;
        for (const d of bloomDay) {
            if (d <= days) {
                consecutive++;
                if (consecutive === k) { bouquets++; consecutive = 0; }
            } else {
                consecutive = 0;
            }
        }
        return bouquets >= m;
    }

    let lo = 1;
    let hi = Math.max(...bloomDay);
    let ans = hi;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (canMake(mid)) {
            ans = mid;        // valid — try smaller
            hi = mid - 1;
        } else {
            lo = mid + 1;     // not valid — need more days
        }
    }

    return ans;
}
```

---

## Method 5 — Rotated Sorted Array

A sorted array rotated at some pivot: `[4, 5, 6, 7, 0, 1, 2]`. One half is always sorted.

```
nums = [4, 5, 6, 7, 0, 1, 2],  target = 0

lo=0 hi=6 mid=3  nums[3]=7
  Left half [4..7] is sorted. target=0 NOT in [4,7] → lo = mid+1 = 4

lo=4 hi=6 mid=5  nums[5]=1
  Left half [0..1] is sorted. target=0 IS in [0,1] → hi = mid-1 = 4

lo=4 hi=4 mid=4  nums[4]=0 == target → return 4 ✓
```

### TypeScript Implementation

```typescript
function searchRotated(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (nums[mid] === target) return mid;

        // Determine which half is sorted
        if (nums[lo] <= nums[mid]) {
            // LEFT half is sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            // RIGHT half is sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }

    return -1;
}
```

---

## Side-by-Side Comparison

```
Method 1 (Classic)            Method 2 (Left Bound)         Method 3 (Right Bound)
─────────────────────         ─────────────────────         ─────────────────────
Return immediately on hit     Save ans, push hi LEFT        Save ans, push lo RIGHT
Return -1 if not found        Return saved ans              Return saved ans
```

---

## Quick-Pick Template Guide

```
"Find if target exists in sorted array"
    → Method 1 (Classic)

"Find first / leftmost occurrence"
    → Method 2 (Left Boundary)

"Find last / rightmost occurrence"
    → Method 3 (Right Boundary)

"Find minimum value satisfying a condition"
    → Method 4 (Search Space), binary search on answer, first TRUE

"Find maximum value satisfying a condition"
    → Method 4 (Search Space), binary search on answer, last TRUE

"Search in rotated sorted array"
    → Method 5, check which half is sorted each iteration
```

---

## The Binary Search Contract

Every binary search follows this exact contract:

```
1. DEFINE   — what does lo, hi, mid represent?
2. SHRINK   — which half to eliminate (lo = mid+1 or hi = mid-1)
3. RECORD   — when to save a candidate answer
4. TERMINATE— loop ends when lo > hi
```

Common bug: using `mid - 1` / `mid + 1` inconsistently or forgetting to save the answer before moving the pointer.

---

*Time complexity: O(log n) for all methods. Space: O(1) iterative, O(log n) recursive (call stack).*
