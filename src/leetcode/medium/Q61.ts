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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  let totalNodes: number = 0;

  let temp: ListNode | null = head;
  let lastNode: ListNode | null = null;
  

  while (temp != null) {
    totalNodes++;
    lastNode = temp.next === null ? temp : temp.next;
    temp = temp.next;
  }

  const nodesToRotate = k > totalNodes ? k - totalNodes : k;
  const nodesToSkip = totalNodes - nodesToRotate;

  if (nodesToSkip === 0) {
    return head;
  }

  temp = new ListNode(0);
  temp.next = head;

  for (let i = 1; i <= nodesToSkip; i++) {
    temp = temp.next!;
  }

  lastNode!.next = head;
  head = temp.next;
  temp.next = null;

  return head;
}
