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

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummyHead: ListNode = new ListNode(0);
  let current: ListNode = dummyHead;

  while (list1 != null && list2 != null) {
    if (list1.val <= list2.val) {
      current.next = new ListNode(list1.val);
      current = current.next;
      list1 = list1.next;
    } else {
      current.next = new ListNode(list2.val);
      current = current.next;
      list2 = list2.next;
    }
  }

  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  return dummyHead.next;
}

// Example usage:
const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const mergedList = mergeTwoLists(list1, list2);
// The mergedList will represent the linked list for the numbers 1 -> 1 -> 2 -> 3 -> 4 -> 4
