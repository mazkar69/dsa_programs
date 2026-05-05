/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Two Pointer method.
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || k === 0) return head;

    let fast: ListNode | null = new ListNode(0, head);
    let slow: ListNode | null = new ListNode(0, head);
    let count = 0;

    for (let i = 0; i < k; i++) {
        if (fast.next) {
            fast = fast.next;
            count++;
        } else {
            k = k % count;
            if (k === 0) return head;
            fast = new ListNode(0, head);
            i = -1; // ✅ Fixed: after i++, loop restarts at i=0
        }
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next!;
    }

    if (slow.next === head) return head;

    fast.next = head;
    head = slow.next;
    slow.next = null;

    return head;
}
// Example usage:
const list1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
let rotatedList1 = rotateRight(list1, 2);
// Output: 4 -> 5 -> 1 -> 2 -> 3

while (rotatedList1) {
  console.log(rotatedList1.val);
  rotatedList1 = rotatedList1.next;
}
