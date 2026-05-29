# Linked List Patterns

> A revision guide for the most common linked list templates. Reversal, fast/slow pointers, merging, and in-place rearrangement.

---

## The Core Idea

Linked list problems are solved by carefully manipulating `next` pointers. The key insight for almost every problem is: *which technique re-links nodes without losing access to the rest of the list?*

| Pattern | Key Technique | Common Use |
|---|---|---|
| **Reversal** | Three pointer (`prev`, `curr`, `next`) | Reverse whole/part of list |
| **Fast / Slow** | Two pointer, different speeds | Middle, cycle, nth from end |
| **Merge** | Compare and re-link | Merge sorted lists |
| **Dummy Head** | Sentinel node | Simplify edge cases at head |

---

## Method 1 — Reverse a Linked List

Use three pointers: `prev`, `curr`, `next`. At each step, flip the `curr.next` arrow then advance all three.

```
Before: 1 → 2 → 3 → 4 → 5 → null

Step 1: prev=null  curr=1  next=2  → 1.next=null   prev=1, curr=2
Step 2: prev=1     curr=2  next=3  → 2.next=1      prev=2, curr=3
Step 3: prev=2     curr=3  next=4  → 3.next=2      prev=3, curr=4
Step 4: prev=3     curr=4  next=5  → 4.next=3      prev=4, curr=5
Step 5: prev=4     curr=5  next=null → 5.next=4    prev=5, curr=null

After: 5 → 4 → 3 → 2 → 1 → null   new head = prev = 5
```

### TypeScript Implementation — Reverse Full List

```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val = 0, next: ListNode | null = null) {
        this.val = val; this.next = next;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr !== null) {
        const next = curr.next;  // save next before overwriting
        curr.next = prev;        // flip the arrow
        prev = curr;             // advance prev
        curr = next;             // advance curr
    }

    return prev;  // prev is now the new head
}
```

### TypeScript Implementation — Reverse Sublist [left, right]

```typescript
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let prevLeft: ListNode = dummy;

    // Step 1: move prevLeft to node just before position `left`
    for (let i = 1; i < left; i++) prevLeft = prevLeft.next!;

    let curr = prevLeft.next!;
    let prev: ListNode | null = null;

    // Step 2: reverse (right - left + 1) nodes
    for (let i = 0; i <= right - left; i++) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next!;
    }

    // Step 3: re-connect
    prevLeft.next!.next = curr;  // tail of reversed sublist → node after right
    prevLeft.next = prev;        // prevLeft → new head of reversed sublist

    return dummy.next;
}
```

---

## Method 2 — Fast / Slow Pointers

`slow` moves 1 step, `fast` moves 2 steps. When `fast` reaches the end, `slow` is at a useful midpoint.

```
Find middle of: 1 → 2 → 3 → 4 → 5

slow=1 fast=1
slow=2 fast=3
slow=3 fast=5  fast.next=null → stop, slow=3 (middle)

For even length: 1 → 2 → 3 → 4
slow=1 fast=1
slow=2 fast=3
slow=3 fast=null → stop, slow=3 (second middle)
```

### TypeScript Implementation — Find Middle

```typescript
function middleNode(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    return slow;  // middle node
}
```

### TypeScript Implementation — Remove Nth Node From End

```typescript
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // Advance fast by n+1 steps to create a gap of n
    for (let i = 0; i <= n; i++) fast = fast!.next;

    // Move both until fast reaches end
    while (fast !== null) {
        slow = slow!.next;
        fast = fast.next;
    }

    // slow is now at the node just before the one to delete
    slow!.next = slow!.next!.next;

    return dummy.next;
}
```

---

## Method 3 — Merge Two Sorted Lists

Use a **dummy head** to avoid edge cases. Always attach the smaller node.

```
l1: 1 → 2 → 4
l2: 1 → 3 → 4

dummy → 1(l1) → 1(l2) → 2(l1) → 3(l2) → 4(l1) → 4(l2)
```

### TypeScript Implementation

```typescript
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    curr.next = l1 ?? l2;  // attach remaining list

    return dummy.next;
}
```

### TypeScript Implementation — Merge K Sorted Lists (using Min Heap)

```typescript
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    // Min heap simulation using sorted array (use a real heap for production)
    const dummy = new ListNode(0);
    let curr = dummy;

    // Push all heads into a min-heap
    const heap: ListNode[] = lists.filter(Boolean) as ListNode[];
    heap.sort((a, b) => a.val - b.val);  // initial sort

    while (heap.length > 0) {
        const smallest = heap.shift()!;  // pop min
        curr.next = smallest;
        curr = curr.next;

        if (smallest.next) {
            // Insert next node in sorted position
            let i = 0;
            while (i < heap.length && heap[i].val <= smallest.next.val) i++;
            heap.splice(i, 0, smallest.next);
        }
    }

    return dummy.next;
}
```

---

## Method 4 — In-Place Rearrangement

Many problems ask you to reorder a list in-place. The pattern is: **find middle → reverse second half → merge two halves**.

```
Reorder List: 1 → 2 → 3 → 4 → 5
Step 1: find middle → first half: 1→2→3,  second half starts at 4→5
Step 2: reverse second half → 5→4
Step 3: merge: 1→5→2→4→3
```

### TypeScript Implementation — Reorder List

```typescript
function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return;

    // Step 1: Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }

    // Step 2: Reverse second half
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow.next;
    slow.next = null;  // cut the list

    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Merge two halves
    let first: ListNode | null = head;
    let second: ListNode | null = prev;

    while (second) {
        const tmp1 = first!.next;
        const tmp2 = second.next;
        first!.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}
```

---

## The Dummy Head Pattern

Whenever operations might affect the head node itself (deletion, insertion at front), use a sentinel dummy node to avoid special-casing:

```typescript
const dummy = new ListNode(0, head);
// ... manipulate list via dummy.next
return dummy.next;  // actual head (may have changed)
```

---

## Side-by-Side Comparison

```
Reversal                    Fast / Slow                 Merge / Dummy Head
─────────────────────       ─────────────────────       ─────────────────────
3 pointers: prev,curr,next  2 pointers at same start    dummy.next is real head
flip curr.next each step    fast moves 2x speed         always attach smaller node
advance all three           stop when fast reaches end  curr advances after attach
saves next BEFORE flipping  slow at middle / nth-end    attach leftover at end
```

---

## Quick-Pick Template Guide

```
"Reverse a linked list"
    → Method 1, three pointers

"Reverse a sublist / reverse in groups of k"
    → Method 1 variant, find sublist boundaries first

"Find middle of linked list"
    → Method 2 (Fast/Slow), stop when fast.next === null

"Detect cycle / find cycle start"
    → Fast/Slow, two phases (see two_pointers_pattern.md)

"Remove nth node from end"
    → Fast/Slow, create n+1 gap between pointers

"Merge two sorted lists"
    → Method 3, dummy head + compare

"Merge K sorted lists"
    → Method 3 + Min Heap

"Reorder list / palindrome linked list"
    → Find middle + Reverse second half + Merge/Compare

"Delete node with specific value / insert at sorted position"
    → Dummy Head pattern
```

---

## The Linked List Contract

```
1. GUARD   — check for null before accessing .next
2. SAVE    — always save curr.next before overwriting curr.next
3. DUMMY   — use sentinel when head might change
4. VERIFY  — draw out pointer positions step by step for complex re-linking
```

The most common bug: losing access to the rest of the list by forgetting to save `next` before overwriting `curr.next`.

---

*Time complexity: O(n) for all operations above. Space: O(1) — all done in-place with a constant number of extra pointers.*
