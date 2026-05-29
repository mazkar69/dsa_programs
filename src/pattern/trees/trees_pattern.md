# Tree Patterns: DFS Traversals, BFS Level Order & Common Operations

> A revision guide for the fundamental tree templates. Master these and you can solve the vast majority of binary tree LeetCode problems.

---

## The Core Idea

Almost every tree problem reduces to a traversal. The key question is: *when do you process the node relative to its children?*

| Traversal | Order | Common Use |
|---|---|---|
| **Pre-order** | Root → Left → Right | Copy tree, serialize, path problems |
| **In-order** | Left → Root → Right | BST sorted output, kth smallest |
| **Post-order** | Left → Right → Root | Delete tree, subtree aggregation, height |
| **Level-order (BFS)** | Level by level | Min depth, right side view, zigzag |

---

## Method 1 — DFS Traversals (Recursive)

```
        1
       / \
      2   3
     / \
    4   5

Pre-order  (Root,L,R): 1 2 4 5 3
In-order   (L,Root,R): 4 2 5 1 3
Post-order (L,R,Root): 4 5 2 3 1
```

### TypeScript Implementation — All Three Traversals

```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val; this.left = left; this.right = right;
    }
}

// Pre-order: process BEFORE recursing
function preOrder(root: TreeNode | null): number[] {
    if (!root) return [];
    return [root.val, ...preOrder(root.left), ...preOrder(root.right)];
}

// In-order: process BETWEEN left and right
function inOrder(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...inOrder(root.left), root.val, ...inOrder(root.right)];
}

// Post-order: process AFTER both children
function postOrder(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...postOrder(root.left), ...postOrder(root.right), root.val];
}
```

---

## Method 2 — DFS with Return Value (Post-order Pattern)

The most versatile pattern. Each recursive call **returns information up** to its parent. Use this for: height, diameter, max path sum, subtree checks.

```
        1
       / \
      2   3
     / \
    4   5

Find diameter (longest path between any two nodes):
postOrder(4) → height=1, update diameter=0
postOrder(5) → height=1, update diameter=0
postOrder(2) → leftH=1, rightH=1, diameter = max(0, 1+1) = 2, return height=2
postOrder(3) → height=1
postOrder(1) → leftH=2, rightH=1, diameter = max(2, 2+1) = 3, return height=3
Answer: 3
```

### TypeScript Implementation — Diameter of Binary Tree

```typescript
function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0;

    function height(node: TreeNode | null): number {
        if (!node) return 0;

        const leftH = height(node.left);
        const rightH = height(node.right);

        // Update global answer at each node
        maxDiameter = Math.max(maxDiameter, leftH + rightH);

        return Math.max(leftH, rightH) + 1;  // return height to parent
    }

    height(root);
    return maxDiameter;
}
```

### TypeScript Implementation — Maximum Path Sum

```typescript
function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;

    function dfs(node: TreeNode | null): number {
        if (!node) return 0;

        // Ignore negative contributions — clamp to 0
        const leftGain = Math.max(dfs(node.left), 0);
        const rightGain = Math.max(dfs(node.right), 0);

        // Path through this node (can't split further up if we go both ways)
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);

        // Return best single-branch gain to parent
        return node.val + Math.max(leftGain, rightGain);
    }

    dfs(root);
    return maxSum;
}
```

---

## Method 3 — BFS Level Order

Use a queue. Process all nodes at the current level before moving to the next. Classic for: level-by-level output, minimum depth, right side view, zigzag.

```
        1          Level 0: [1]
       / \
      2   3        Level 1: [2, 3]
     / \   \
    4   5   6      Level 2: [4, 5, 6]
```

### TypeScript Implementation — Level Order Traversal

```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;  // snapshot of current level's size
        const level: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}
```

### TypeScript Implementation — Right Side View

```typescript
function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            if (i === levelSize - 1) result.push(node.val);  // last node at each level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}
```

---

## Method 4 — BST Operations

In a BST: `left subtree < root < right subtree`. Every operation takes O(h) where `h = log n` for balanced, `h = n` for skewed.

### TypeScript Implementation — Search, Insert, Validate

```typescript
// Search
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return null;
    if (root.val === val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

// Insert
function insertBST(root: TreeNode | null, val: number): TreeNode {
    if (!root) return new TreeNode(val);
    if (val < root.val) root.left = insertBST(root.left, val);
    else root.right = insertBST(root.right, val);
    return root;
}

// Validate BST (pass down min/max bounds)
function isValidBST(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, min: number, max: number): boolean {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    return validate(root, -Infinity, Infinity);
}
```

### TypeScript Implementation — Lowest Common Ancestor (LCA)

```typescript
// LCA of Binary Tree (general — not BST)
function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode,
    q: TreeNode
): TreeNode | null {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // If both sides found a target → this node is LCA
    if (left && right) return root;
    return left ?? right;
}

// LCA of BST (exploit ordering)
function lcaBST(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
    if (p.val < root.val && q.val < root.val) return lcaBST(root.left!, p, q);
    if (p.val > root.val && q.val > root.val) return lcaBST(root.right!, p, q);
    return root;  // split point is the LCA
}
```

---

## Method 5 — Path Sum Problems

These combine DFS with a running sum passed down the tree.

```
        5
       / \
      4   8
     /   / \
    11  13   4
   /  \       \
  7    2       1

Target = 22
Path: 5 → 4 → 11 → 2 = 22 ✓
```

### TypeScript Implementation — Has Path Sum / All Paths

```typescript
// Does any root-to-leaf path sum to target?
function hasPathSum(root: TreeNode | null, target: number): boolean {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === target;  // leaf check
    return hasPathSum(root.left, target - root.val) || hasPathSum(root.right, target - root.val);
}

// Collect all root-to-leaf paths with target sum
function pathSum(root: TreeNode | null, target: number): number[][] {
    const result: number[][] = [];

    function dfs(node: TreeNode | null, remaining: number, path: number[]): void {
        if (!node) return;
        path.push(node.val);
        if (!node.left && !node.right && remaining === node.val) {
            result.push([...path]);
        }
        dfs(node.left, remaining - node.val, path);
        dfs(node.right, remaining - node.val, path);
        path.pop();  // backtrack
    }

    dfs(root, target, []);
    return result;
}
```

---

## Side-by-Side Comparison

```
DFS Recursive (Return)         BFS Level Order               DFS Iterative (Stack)
─────────────────────          ─────────────────────         ─────────────────────
Post-order style               Queue, process level-size     Stack, push right first
Returns value up to parent     Snapshot levelSize before     Mimics recursive pre-order
Best: height, diameter,        Best: depth, level output,    Best: when stack depth
  max path, subtree checks       right view, zigzag            matters (deep trees)
```

---

## Quick-Pick Template Guide

```
"Height / depth of tree"
    → Post-order DFS, return height from leaves up

"Diameter (longest path)"
    → Post-order DFS, update global max at each node

"Maximum path sum"
    → Post-order DFS, clamp negative gains to 0

"Level by level output / min depth / right side view"
    → BFS level order

"Check if subtree / identical trees / symmetric"
    → Recursive DFS comparing left and right

"Validate BST"
    → DFS with min/max bounds passed down

"Lowest Common Ancestor"
    → Post-order DFS: return root if p or q found, check both sides

"Root-to-leaf path sum"
    → Pre-order DFS, pass remaining sum down
```

---

## The Tree DFS Contract

```
1. BASE    — handle null node (return 0, false, null, etc.)
2. RECURSE — call on left and right children
3. COMBINE — merge left and right results to compute current node's answer
4. RETURN  — pass useful information up to the parent
```

The most common bug: forgetting to handle the null base case, or confusing which traversal order to use (process node before, between, or after children).

---

*Time complexity: O(n) for all traversals — every node is visited exactly once. Space: O(h) for DFS recursion stack, O(w) for BFS queue where w is max tree width.*
