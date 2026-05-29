# Heap / Priority Queue Patterns

> A revision guide for heap-based patterns. Master these and you can solve Top K, scheduling, median stream, and merge problems efficiently.

---

## The Core Idea

A **heap** (priority queue) gives you O(log n) insert and O(1) peek for the min or max element. In JavaScript/TypeScript there is no built-in heap — you must implement one or simulate with a sorted structure.

| Pattern | Heap Type | Common Use |
|---|---|---|
| **Top K Elements** | Min-Heap of size K | K largest/smallest elements |
| **K Closest** | Max-Heap of size K | K closest points/numbers |
| **Merge K Sorted** | Min-Heap of K heads | Merge streams/lists |
| **Sliding Window Max** | Max-Heap / Deque | Maximum in each window |
| **Find Median Stream** | Two heaps (max + min) | Running median |

---

## Heap Implementation (TypeScript)

JavaScript has no native heap. Use this minimal class:

```typescript
class MinHeap {
    private data: number[] = [];

    push(val: number): void {
        this.data.push(val);
        this._bubbleUp(this.data.length - 1);
    }

    pop(): number | undefined {
        if (this.data.length === 0) return undefined;
        const top = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            this._sinkDown(0);
        }
        return top;
    }

    peek(): number | undefined { return this.data[0]; }
    size(): number { return this.data.length; }

    private _bubbleUp(i: number): void {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.data[parent] <= this.data[i]) break;
            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
    }

    private _sinkDown(i: number): void {
        const n = this.data.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && this.data[left] < this.data[smallest]) smallest = left;
            if (right < n && this.data[right] < this.data[smallest]) smallest = right;
            if (smallest === i) break;
            [this.data[smallest], this.data[i]] = [this.data[i], this.data[smallest]];
            i = smallest;
        }
    }
}
```

For a **Max-Heap**, negate values on push and negate again on pop:
```typescript
// Max-Heap trick: push(-val), peek/pop returns -val, negate it back
heap.push(-val);
const max = -heap.pop()!;
```

---

## Method 1 — Top K Largest Elements

Maintain a **min-heap of size K**. When a new element is larger than the heap's min, replace it.

```
nums = [3,2,1,5,6,4],  k=2

Process 3: heap=[3]
Process 2: heap=[2,3]
Process 1: heap=[1,2,3] size>k → pop min(1), heap=[2,3]
Process 5: 5 > heap.peek()=2 → pop 2, push 5, heap=[3,5]
Process 6: 6 > heap.peek()=3 → pop 3, push 6, heap=[5,6]
Process 4: 4 < heap.peek()=5 → skip
Heap = [5,6] → kth largest = heap.peek() = 5
```

### TypeScript Implementation — Kth Largest Element

```typescript
function findKthLargest(nums: number[], k: number): number {
    const heap = new MinHeap();

    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) heap.pop();  // keep only k largest
    }

    return heap.peek()!;  // min of the k largest = kth largest overall
}
```

### TypeScript Implementation — Top K Frequent Elements

```typescript
function topKFrequent(nums: number[], k: number): number[] {
    // Count frequencies
    const freq = new Map<number, number>();
    for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);

    // Min-heap of [freq, val], size k
    // Simulated with sorted array for clarity
    const heap: [number, number][] = [];  // [frequency, value]

    for (const [val, count] of freq) {
        heap.push([count, val]);
        heap.sort((a, b) => a[0] - b[0]);  // sort by freq ascending
        if (heap.length > k) heap.shift(); // pop min freq
    }

    return heap.map(([_, val]) => val);
}
```

---

## Method 2 — K Closest Points to Origin

Use a **max-heap of size K** keyed on distance. If a new point is closer than the farthest in the heap, replace it.

```typescript
function kClosest(points: number[][], k: number): number[][] {
    // Max-heap by distance (negate distance for min-heap trick)
    // [negated_dist, index]
    const heap: [number, number][] = [];

    const sinkDown = (i: number) => { /* ... standard heap ops */ };

    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        const dist = -(x * x + y * y);  // negated for max-heap behavior

        heap.push([dist, i]);
        heap.sort((a, b) => a[0] - b[0]);  // sort ascending (most negative = farthest)
        if (heap.length > k) heap.shift();  // pop farthest
    }

    return heap.map(([_, i]) => points[i]);
}
```

---

## Method 3 — Find Median from Data Stream

Use **two heaps**: a max-heap for the lower half and a min-heap for the upper half. Balance them to differ by at most 1.

```
Stream: 5, 10, 2, 7

Add 5:   maxHeap=[5]    minHeap=[]     median=5
Add 10:  maxHeap=[5]    minHeap=[10]   median=(5+10)/2=7.5
Add 2:   maxHeap=[2,5]  minHeap=[10]   unbalanced! move max(5) to minHeap
         maxHeap=[2]    minHeap=[5,10] median=5
Add 7:   maxHeap=[2,7]  minHeap=[5,10] 7>5=minHeap.peek → move 7 to minHeap, 5 to maxHeap
         maxHeap=[2,5]  minHeap=[7,10] median=(5+7)/2=6
```

### TypeScript Implementation — MedianFinder

```typescript
class MedianFinder {
    // maxHeap (lower half): negate values to use MinHeap
    private lower: number[] = [];
    // minHeap (upper half)
    private upper: number[] = [];

    addNum(num: number): void {
        // Step 1: add to lower (max-heap)
        this.lower.push(-num);
        this.lower.sort((a, b) => a - b);  // ascending → most negative = largest val

        // Step 2: balance — lower's max must be <= upper's min
        if (this.upper.length > 0 && -this.lower[0] > this.upper[0]) {
            const moved = -this.lower.shift()!;
            this.upper.push(moved);
            this.upper.sort((a, b) => a - b);
        }

        // Step 3: size balance (lower can be at most 1 larger)
        if (this.lower.length > this.upper.length + 1) {
            const moved = -this.lower.shift()!;
            this.upper.push(moved);
            this.upper.sort((a, b) => a - b);
        } else if (this.upper.length > this.lower.length) {
            const moved = this.upper.shift()!;
            this.lower.unshift(-moved);
            this.lower.sort((a, b) => a - b);
        }
    }

    findMedian(): number {
        if (this.lower.length > this.upper.length) return -this.lower[0];
        return (-this.lower[0] + this.upper[0]) / 2;
    }
}
```

---

## Method 4 — Task Scheduler / Greedy with Heap

Greedily always execute the most frequent available task.

```typescript
function leastInterval(tasks: string[], n: number): number {
    const freq = new Array(26).fill(0);
    for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
    freq.sort((a, b) => b - a);  // sort descending

    const maxFreq = freq[0];
    let maxCount = freq.filter(f => f === maxFreq).length;

    // Formula: max((maxFreq-1)*(n+1) + maxCount, tasks.length)
    return Math.max((maxFreq - 1) * (n + 1) + maxCount, tasks.length);
}
```

---

## Side-by-Side Comparison

```
Top K Largest              Top K Smallest            Median Stream
─────────────────────      ─────────────────────     ─────────────────────
Min-Heap size K            Max-Heap size K           Two heaps (max + min)
Pop when size > K          Pop when size > K          Rebalance after each add
Heap.peek() = Kth largest  Heap.peek() = Kth smallest Peek both tops for median
```

---

## Quick-Pick Template Guide

```
"Kth largest element in array"
    → Min-Heap of size K, peek gives answer

"Kth smallest element in array"
    → Max-Heap of size K (negate values), peek gives answer

"Top K frequent elements"
    → Count freqs + Min-Heap of size K keyed on frequency

"K closest points to origin"
    → Max-Heap of size K keyed on distance (keep closest)

"Merge K sorted lists/arrays"
    → Min-Heap with (value, listIndex, elementIndex), pop and push next

"Find running median of a stream"
    → Two heaps: max-heap (lower half) + min-heap (upper half)

"Task scheduler / CPU scheduling"
    → Greedy: always pick most frequent available task (Max-Heap)

"Sliding window maximum"
    → Monotonic Deque (see monotonic_stack) — heap works but O(n log n)
```

---

## The Heap Contract

```
1. CHOOSE   — min-heap or max-heap? (max → negate values in min-heap)
2. SIZE     — cap at K? (pop after inserting when size > K)
3. KEY      — what are you comparing? (value, frequency, distance)
4. ANSWER   — peek() gives K-th element, or drain for sorted order
```

The most common bug: using a max-heap when you need a min-heap or vice versa — visualize which end you need to pop.

---

*Time complexity: O(n log k) for Top-K problems. O(log n) per insert/delete in the heap. Space: O(k) for the heap.*
