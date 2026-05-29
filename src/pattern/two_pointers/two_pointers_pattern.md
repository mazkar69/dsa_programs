# Two Pointers Patterns

> A revision guide for opposite-ends and same-direction two pointer templates. O(n) solutions for sorted array and in-place problems.

---

## The Core Idea

Two pointers avoid the O(n²) brute-force nested loop by using **two indices that move toward each other or in the same direction**, exploiting sorted order or a structural property.

| Pattern | Pointer direction | Common use case |
|---|---|---|
| **Opposite Ends** | Toward each other | Pair sum, container, palindrome |
| **Same Direction (Fast/Slow)** | Same way, different speeds | Cycle detection, remove duplicates |
| **Partition** | One write, one read | In-place rearrangement |

---

## Method 1 — Opposite Ends (Converging)

Start with `left = 0`, `right = n-1`. Move them toward each other based on a comparison.

```
nums = [-4, -1, 0, 3, 10],  target = 0  (two sum closest to target)

left=0(-4)  right=4(10)  sum=6  > target → move right left
left=0(-4)  right=3(3)   sum=-1 < target → move left right
left=1(-1)  right=3(3)   sum=2  > target → move right left
left=1(-1)  right=2(0)   sum=-1 < target → move left right
left=2(0)   right=2      lo >= hi → stop
```

### TypeScript Implementation — Two Sum (Sorted)

```typescript
function twoSumSorted(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum === target) return [left, right];
        else if (sum < target) left++;   // need larger sum → move left right
        else right--;                    // need smaller sum → move right left
    }

    return [];
}
```

### TypeScript Implementation — Container With Most Water

```typescript
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);

        // Move the shorter side — moving the taller side can only decrease area
        if (height[left] < height[right]) left++;
        else right--;
    }

    return max;
}
```

### TypeScript Implementation — 3Sum

```typescript
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);   // sort first!
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // skip duplicates

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;   // skip dups
                while (left < right && nums[right] === nums[right - 1]) right--; // skip dups
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
```

---

## Method 2 — Fast / Slow Pointers (Same Direction)

Both pointers start at the same end. `fast` runs ahead; `slow` marks a position to write.

```
nums = [0, 1, 2, 2, 3, 0, 4, 2],  remove all 2s in-place

slow=0  fast=0  nums[0]=0 ≠ 2 → nums[slow]=nums[fast], slow++
slow=1  fast=1  nums[1]=1 ≠ 2 → nums[slow]=nums[fast], slow++
slow=2  fast=2  nums[2]=2 == 2 → skip, only fast moves
slow=2  fast=3  nums[3]=2 == 2 → skip
slow=2  fast=4  nums[4]=3 ≠ 2 → nums[2]=3, slow++
slow=3  fast=5  nums[5]=0 ≠ 2 → nums[3]=0, slow++
slow=4  fast=6  nums[6]=4 ≠ 2 → nums[4]=4, slow++
slow=5  fast=7  nums[7]=2 == 2 → skip
Result: [0, 1, 3, 0, 4, _, _, _]  slow=5 is the new length
```

### TypeScript Implementation — Remove Element In-Place

```typescript
function removeElement(nums: number[], val: number): number {
    let slow = 0;   // write pointer — next position for a valid element

    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }

    return slow;  // new length
}
```

### TypeScript Implementation — Remove Duplicates (Sorted)

```typescript
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    let slow = 1;  // first element is always kept

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[fast - 1]) {  // new unique element
            nums[slow] = nums[fast];
            slow++;
        }
    }

    return slow;
}
```

---

## Method 3 — Cycle Detection (Floyd's Tortoise & Hare)

`slow` moves 1 step, `fast` moves 2 steps. If there's a cycle, they meet inside it.

```
List: 1 → 2 → 3 → 4 → 5 → 3 (cycle back to node 3)

Step 1: slow=2  fast=3
Step 2: slow=3  fast=5
Step 3: slow=4  fast=4  ← MEET (cycle detected)

Phase 2: reset one pointer to head
slow=1  fast=4
Step 1: slow=2  fast=5
Step 2: slow=3  fast=3  ← MEET = cycle start
```

### TypeScript Implementation

```typescript
function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    // Phase 1: detect if cycle exists
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }

    if (fast === null || fast.next === null) return null;  // no cycle

    // Phase 2: find cycle entry
    slow = head;
    while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
    }

    return slow;  // cycle start node
}
```

---

## Method 4 — Partition Pointer (Dutch National Flag)

Maintain three regions: `[processed-left | unprocessed | processed-right]` using a `low`, `mid`, `high` scheme.

```
nums = [2, 0, 2, 1, 1, 0]  → sort into [0s | 1s | 2s]

lo=0  mid=0  hi=5
nums[mid]=2 → swap(mid,hi), hi--    [0,0,2,1,1,2]  lo=0 mid=0 hi=4
nums[mid]=0 → swap(mid,lo), lo++, mid++  [0,0,2,1,1,2] lo=1 mid=1 hi=4
nums[mid]=0 → swap(mid,lo), lo++, mid++  [0,0,2,1,1,2] lo=2 mid=2 hi=4
nums[mid]=2 → swap(mid,hi), hi--    [0,0,1,1,2,2]  lo=2 mid=2 hi=3
nums[mid]=1 → mid++                 lo=2 mid=3 hi=3
nums[mid]=1 → mid++                 lo=2 mid=4 hi=3
mid > hi → stop
Result: [0, 0, 1, 1, 2, 2] ✓
```

### TypeScript Implementation — Sort Colors

```typescript
function sortColors(nums: number[]): void {
    let lo = 0;
    let mid = 0;
    let hi = nums.length - 1;

    while (mid <= hi) {
        if (nums[mid] === 0) {
            [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
            lo++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
            hi--;
            // don't increment mid — newly swapped element needs checking
        }
    }
}
```

---

## Side-by-Side Comparison

```
Opposite Ends              Fast / Slow                Partition
─────────────────────      ─────────────────────      ─────────────────────
left=0, right=n-1          slow=0, fast=0 (or 1)      lo=0, mid=0, hi=n-1
Move toward each other     fast outruns slow           mid explores middle
Condition: left < right    Condition: fast != null     Condition: mid <= hi
Use: sorted array pairs    Use: in-place write/read    Use: 3-way sort
```

---

## Quick-Pick Template Guide

```
"Two Sum / Three Sum in sorted array"
    → Method 1 (Opposite Ends), move based on sum comparison

"Palindrome check / Container with most water"
    → Method 1 (Opposite Ends)

"Remove elements / duplicates in-place"
    → Method 2 (Fast/Slow), slow is write pointer

"Middle of linked list"
    → Fast/Slow, when fast reaches end slow is at middle

"Detect / find start of cycle in linked list"
    → Method 3 (Floyd's), two phases

"Sort array with 3 distinct values (0, 1, 2)"
    → Method 4 (Partition / Dutch National Flag)
```

---

## The Two Pointer Contract

```
1. DECIDE  — which direction? converging (opposite ends) or same direction?
2. MOVE    — which pointer to advance, and why? (based on comparison)
3. AVOID   — don't cross: left < right (opposite) / fast != null (fast-slow)
```

Common bug: moving both pointers when only one should move, or not handling duplicate skipping in 3Sum.

---

*Time complexity: O(n) for all methods after any initial O(n log n) sort. Space: O(1).*
