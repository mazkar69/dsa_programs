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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Using recurrsion.
  function deleteNode(pre: ListNode | null, current: ListNode | null): number {
    if (current === null) {
      return 0;
    }

    const nodeNumber: number = deleteNode(current, current.next) + 1;
    if (nodeNumber == n) {
      // Delete this node.
      pre === null ? (head = head!.next) : (pre.next = current.next);
    }
    return nodeNumber;
  }
  const pre: ListNode | null = null;
  const current: ListNode | null = head;

  deleteNode(pre, current);

  return head;
}

// Using two pointers. || BETTER SOLUTION
// function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
//   let dummy = new ListNode(0, head);
//   let fast: ListNode | null = dummy;
//   let slow: ListNode | null = dummy;

//   // Move fast pointer n+1 steps ahead
//   for (let i = 0; i <= n; i++) {
//     fast = fast!.next;
//   }

//   // Move both until fast reaches end
//   while (fast !== null) {
//     fast = fast.next;
//     slow = slow!.next;
//   }

//   // Delete node
//   slow!.next = slow!.next!.next;

//   return dummy.next;
// }
