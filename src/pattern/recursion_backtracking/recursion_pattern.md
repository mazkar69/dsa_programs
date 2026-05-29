# Recursion Patterns: Subsets, Combinations & Permutations

> A revision guide for the three fundamental backtracking templates. Master these and you can solve almost any "generate all..." problem.

---

## The Core Idea

All three patterns use **recursion + backtracking**. The difference is *what decision* you make at each recursive call.

| Pattern | Decision at each step | Order matters? | Duplicates? |
|---|---|---|---|
| **Subsets** | Take or skip this element | ❌ No | ❌ No |
| **Combinations** | Pick from remaining elements | ❌ No | ❌ No |
| **Permutations** | Swap to place each element | ✅ Yes | ❌ No |

---

## Method 1 — Subsets: Take / Skip (Binary Decision Tree)

Every element faces exactly one binary choice: **include it** or **skip it**.

```
nums = [1, 2, 3]

                    solve([], 0)
                   /             \
          Take 1                  Skip 1
       solve([1], 1)           solve([], 1)
        /        \               /        \
   Take 2       Skip 2      Take 2       Skip 2
solve([1,2],2) solve([1],2) solve([2],2) solve([],2)
   /     \       /    \      /    \      /    \
 T3    S3   T3    S3  T3   S3  T3   S3
[1,2,3][1,2][1,3][1] [2,3][2] [3]  []
```

### TypeScript Implementation

```typescript
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    function solve(currentSubset: number[], index: number): void {

        // Base case: processed all elements → record this subset
        if (index >= nums.length) {
            result.push([...currentSubset]);   // spread to clone the array
            return;
        }

        // --- Branch 1: TAKE nums[index] ---
        currentSubset.push(nums[index]);
        solve(currentSubset, index + 1);

        // --- Branch 2: SKIP nums[index] ---
        currentSubset.pop();                   // undo the push (backtrack)
        solve(currentSubset, index + 1);
    }

    solve([], 0);
    return result;
}
```

**Mental model:** imagine a binary tree with depth `n`. Every leaf is one unique subset.  
**Total subsets:** `2ⁿ` (each element independently in or out).

---

## Method 2 — Subsets / Combinations: Loop from Index

Instead of a binary take/skip, you **loop forward** from the current index and try each remaining element as the next pick. This naturally avoids duplicates by never going backwards.

```
nums = [1, 2, 3]

solve([], 0)               ← push [] immediately
  pick i=0 → solve([1], 1)    ← push [1]
    pick i=1 → solve([1,2], 2)  ← push [1,2]
      pick i=2 → solve([1,2,3], 3) ← push [1,2,3]
    pick i=2 → solve([1,3], 3)  ← push [1,3]
  pick i=1 → solve([2], 2)    ← push [2]
    pick i=2 → solve([2,3], 3)  ← push [2,3]
  pick i=2 → solve([3], 3)    ← push [3]
```

### TypeScript Implementation

```typescript
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];

    function solve(currentSubset: number[], startIndex: number): void {

        // Record BEFORE looping — captures the current partial subset too
        result.push([...currentSubset]);

        for (let i = startIndex; i < nums.length; i++) {
            currentSubset.push(nums[i]);          // choose
            solve(currentSubset, i + 1);           // explore (i+1 prevents reuse)
            currentSubset.pop();                   // un-choose (backtrack)
        }
    }

    solve([], 0);
    return result;
}
```

**Key insight:** pushing to `result` at the top of the function (before the loop) means every partial state is recorded — that's what gives you all subsets. For **k-length combinations only**, add a length guard before pushing:

```typescript
// Combinations of exactly k elements
if (currentSubset.length === k) {
    result.push([...currentSubset]);
    return;
}
```

---

## Method 3 — Permutations: Swap in Place

Permutations care about **order**, so every arrangement of elements is distinct. The trick is to swap the element at the current position with every element from that position to the end, recurse, then swap back.

```
nums = [1, 2, 3],  solve at index 0

index=0: swap(0,0)→[1,2,3]  swap(0,1)→[2,1,3]  swap(0,2)→[3,2,1]
           ↓                    ↓                    ↓
index=1: swap(1,1) swap(1,2)  swap(1,1) swap(1,2)  swap(1,1) swap(1,2)
         [1,2,3]  [1,3,2]    [2,1,3]  [2,3,1]    [3,2,1]  [3,1,2]
```

### TypeScript Implementation

```typescript
function permutations(nums: number[]): number[][] {
    const result: number[][] = [];

    function solve(currentIndex: number): void {

        // Base case: pointer reached the end → one full permutation is built
        if (currentIndex === nums.length) {
            result.push([...nums]);
            return;
        }

        for (let swapIndex = currentIndex; swapIndex < nums.length; swapIndex++) {

            // Place nums[swapIndex] at currentIndex by swapping
            [nums[currentIndex], nums[swapIndex]] = [nums[swapIndex], nums[currentIndex]];

            solve(currentIndex + 1);   // fix currentIndex, recurse deeper

            // Undo the swap (backtrack to original order)
            [nums[currentIndex], nums[swapIndex]] = [nums[swapIndex], nums[currentIndex]];
        }
    }

    solve(0);
    return result;
}
```

**Why swap back?** Each recursive branch must start from the *same* array state. Without the undo-swap, earlier swaps corrupt future branches.  
**Total permutations:** `n!`

---

## Side-by-Side Comparison

```
Method 1 (Take/Skip)          Method 2 (Loop)               Method 3 (Swap)
─────────────────────         ─────────────────────         ─────────────────────
Base: index >= n              Base: (implicit)              Base: index === n
Record at BASE CASE           Record at TOP of call         Record at BASE CASE

Two recursive calls:          One loop, recursive:          One loop, recursive:
  solve(arr, idx+1)  ← take     for i = startIdx..n          for i = curIdx..n
  solve(arr, idx+1)  ← skip       arr.push(nums[i])             swap(cur, i)
                                  solve(arr, i+1)               solve(cur+1)
Backtrack: arr.pop()              arr.pop()  ← backtrack         swap back ← backtrack
```

---

## Quick-Pick Template Guide

```
"Generate all subsets"
    → Method 1 (take/skip) or Method 2 (loop)

"Generate all combinations of size k"
    → Method 2 with length guard (if length === k, push & return)

"Generate all permutations"
    → Method 3 (swap in place)

"Generate all combinations summing to target" (Combination Sum)
    → Method 2, pass i (not i+1) if reuse allowed, i+1 if not

"Generate all subsets without duplicate results" (input has duplicates)
    → Sort first, then skip nums[i] === nums[i-1] inside the loop
```

---

## The Backtracking Contract

Every backtracking solution follows this exact contract:

```
1. CHOOSE   — make a decision (push / swap)
2. EXPLORE  — recurse with the decision applied
3. UN-CHOOSE — undo the decision (pop / swap back)
```

If you forget step 3, you're mutating shared state across branches — the most common bug in backtracking.

---

*Time complexity for all three: O(n × 2ⁿ) for subsets, O(n × 2ⁿ) for combinations, O(n × n!) for permutations — dominated by the number of results to build.*
