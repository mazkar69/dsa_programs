# Monotonic Stack Patterns

> A revision guide for monotonic stack and classic stack templates. Master these and you can solve "next greater/smaller", histogram, and span problems in O(n).

---

## The Core Idea

A **monotonic stack** maintains elements in sorted order (increasing or decreasing). When a new element violates the order, you **pop** elements from the stack — and that pop event is exactly when you know the answer for those elements.

| Pattern | Stack Order | Answers |
|---|---|---|
| **Monotonic Increasing** | Bottom → Top: small → large | Next Greater Element, temperatures |
| **Monotonic Decreasing** | Bottom → Top: large → small | Next Smaller Element, stock span |
| **Histogram / Areas** | Increasing by height | Largest rectangle, trapping water |

---

## Method 1 — Next Greater Element (Monotonic Decreasing Stack)

For each element, find the **first element to its right that is larger**.

```
nums = [2, 1, 2, 4, 3]

Process index 0 (val=2): stack=[]  push(0)  stack=[0]
Process index 1 (val=1): 1 < nums[0]=2, push(1)  stack=[0,1]
Process index 2 (val=2): 2 > nums[1]=1 → pop 1, NGE[1]=2. 2 == nums[0]=2, push(2)  stack=[0,2]
Process index 3 (val=4): 4 > nums[2]=2 → pop 2, NGE[2]=4. 4 > nums[0]=2 → pop 0, NGE[0]=4. push(3)  stack=[3]
Process index 4 (val=3): 3 < nums[3]=4, push(4)  stack=[3,4]
Remaining in stack → NGE[3]=-1, NGE[4]=-1

Result: [4, 2, 4, -1, -1]
```

### TypeScript Implementation — Next Greater Element

```typescript
function nextGreaterElement(nums: number[]): number[] {
    const result = new Array(nums.length).fill(-1);
    const stack: number[] = [];  // stack of INDICES

    for (let i = 0; i < nums.length; i++) {
        // Pop all elements smaller than nums[i] — nums[i] is their next greater
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            const idx = stack.pop()!;
            result[idx] = nums[i];
        }
        stack.push(i);
    }

    return result;
}
```

**Key insight:** we store *indices* in the stack so we can fill `result[idx]` when popping.

---

## Method 2 — Daily Temperatures (Next Greater with Distance)

Same pattern but answer is the *distance* to the next warmer day.

```
temps = [73, 74, 75, 71, 69, 72, 76, 73]

Process 0(73): stack=[0]
Process 1(74): 74>73 → pop 0, wait[0]=1-0=1. push(1)  stack=[1]
Process 2(75): 75>74 → pop 1, wait[1]=2-1=1. push(2)  stack=[2]
Process 3(71): push(3)  stack=[2,3]
Process 4(69): push(4)  stack=[2,3,4]
Process 5(72): 72>69 → pop 4, wait[4]=5-4=1. 72>71 → pop 3, wait[3]=5-3=2. push(5)  stack=[2,5]
Process 6(76): 76>72 → pop 5, wait[5]=6-5=1. 76>75 → pop 2, wait[2]=6-2=4. push(6)  stack=[6]
Process 7(73): push(7)  stack=[6,7]
Remaining → wait[6]=0, wait[7]=0

Result: [1, 1, 4, 2, 1, 1, 0, 0]
```

### TypeScript Implementation

```typescript
function dailyTemperatures(temperatures: number[]): number[] {
    const result = new Array(temperatures.length).fill(0);
    const stack: number[] = [];  // indices

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop()!;
            result[idx] = i - idx;  // distance to next warmer day
        }
        stack.push(i);
    }

    return result;
}
```

---

## Method 3 — Largest Rectangle in Histogram

For each bar, find how far left and right it can extend at its own height. Use a monotonic increasing stack — pop when a shorter bar is encountered.

```
heights = [2, 1, 5, 6, 2, 3]

Process 0(h=2): stack=[0]
Process 1(h=1): 1 < heights[0]=2 → pop 0
  width = 1 (no element left of stack, so extends to index 0)
  area = 2 * 1 = 2. push(1)  stack=[1]
Process 2(h=5): push(2) stack=[1,2]
Process 3(h=6): push(3) stack=[1,2,3]
Process 4(h=2): 2 < 6 → pop 3, area=6*(4-2-1)=6. 2 < 5 → pop 2, area=5*(4-1-1)=10. push(4) stack=[1,4]
Process 5(h=3): push(5) stack=[1,4,5]
End: pop 5, area=3*(6-4-1)=3. pop 4, area=2*(6-1-1)=8. pop 1, area=1*6=6.
Max area = 10
```

### TypeScript Implementation — Largest Rectangle in Histogram

```typescript
function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];  // monotonic increasing stack of indices
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];  // sentinel 0 at end

        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}
```

---

## Method 4 — Trapping Rainwater (Stack Approach)

Pop when a taller bar is found — the trapped water fills the "valley" between the current bar and the new taller bar.

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

(Alternatively: use two-pointer O(1) space approach)
```

### TypeScript Implementation — Two-Pointer Approach (Recommended)

```typescript
function trap(height: number[]): number {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }

    return water;
}
```

---

## Method 5 — Stock Span (Monotonic Decreasing — Previous Greater)

Find how many consecutive days before today had equal or lower prices.

```
prices = [100, 80, 60, 70, 60, 75, 85]

i=0(100): stack=[] → span=1, push(0)  stack=[0]
i=1(80):  80 < 100 → span=1, push(1) stack=[0,1]
i=2(60):  60 < 80  → span=1, push(2) stack=[0,1,2]
i=3(70):  70 > 60 → pop 2. 70 < 80 → stop. span=3-1=2, push(3)  stack=[0,1,3]
i=4(60):  60 < 70  → span=1, push(4) stack=[0,1,3,4]
i=5(75):  75 > 60 → pop 4. 75 > 70 → pop 3. 75 < 80 → stop. span=5-1=4, push(5)
i=6(85):  85 > 75 → pop 5. 85 > 80 → pop 1. 85 < 100 → stop. span=6-0=6, push(6)

Result: [1, 1, 1, 2, 1, 4, 6]
```

### TypeScript Implementation

```typescript
function calculateSpan(prices: number[]): number[] {
    const span = new Array(prices.length).fill(0);
    const stack: number[] = [];  // indices of elements with no greater element yet

    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
            stack.pop();
        }
        span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
        stack.push(i);
    }

    return span;
}
```

---

## Side-by-Side Comparison

```
Next Greater (Decreasing)     Next Smaller (Increasing)     Histogram
─────────────────────         ─────────────────────         ─────────────────────
Push index                    Push index                    Push index
Pop when nums[i] > top        Pop when nums[i] < top        Pop when heights[i] < top
Answer for popped = nums[i]   Answer for popped = nums[i]   Area = h * width
Left in stack → answer -1     Left in stack → answer -1     Add sentinel 0 at end
```

---

## Quick-Pick Template Guide

```
"Next greater element (to the right)"
    → Monotonic Decreasing Stack, pop when current > top

"Next smaller element (to the right)"
    → Monotonic Increasing Stack, pop when current < top

"Previous greater element (to the left)"
    → Process left to right, answer for each pushed index is current top

"Daily temperatures / waiting days"
    → Monotonic Decreasing, store distance (i - idx) on pop

"Largest rectangle in histogram"
    → Monotonic Increasing, pop when shorter bar found, add sentinel 0

"Trapping rainwater"
    → Two-pointer (O(1) space) or Monotonic Stack

"Stock span"
    → Monotonic Decreasing, span = i - stack top after pops
```

---

## The Monotonic Stack Contract

```
1. DECIDE  — increasing (find next smaller) or decreasing (find next greater)?
2. POP     — when new element violates the order → answer for the popped element
3. ANSWER  — what to record when popping (value, index, distance)?
4. CLEANUP — elements left in stack at the end have no valid answer (-1, 0, n)
```

The most common bug: storing values instead of indices in the stack — you need indices to compute distances and fill the result array.

---

*Time complexity: O(n) — each element is pushed and popped at most once. Space: O(n) for the stack.*
