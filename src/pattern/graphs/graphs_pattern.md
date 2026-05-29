# Graph Patterns: BFS, DFS & Topological Sort

> A revision guide for the three fundamental graph templates. Master these and you can solve islands, shortest path, connectivity, and ordering problems.

---

## The Core Idea

Graphs are nodes connected by edges. The traversal pattern depends on *what question* you're asking.

| Pattern | Data Structure | Best For |
|---|---|---|
| **BFS** | Queue (FIFO) | Shortest path (unweighted), level-by-level |
| **DFS** | Stack / Recursion | Connectivity, cycle detection, path existence |
| **Topological Sort** | BFS (Kahn's) / DFS | Ordering with dependencies (DAG only) |
| **Union Find** | Array (parent) | Connected components, cycle detection |

---

## Method 1 — BFS (Breadth-First Search)

Explore all neighbors at distance `d` before moving to distance `d+1`. Guarantees **shortest path** in unweighted graphs.

```
Graph:  1 - 2 - 5
        |   |
        3 - 4
Start at 1, find shortest path to 5

Queue: [1]           visited: {1}
Pop 1 → neighbors 2,3 → Queue: [2,3]   visited: {1,2,3}  dist[2]=1, dist[3]=1
Pop 2 → neighbors 1,4,5 → Queue: [3,4,5] visited: {1,2,3,4,5}  dist[4]=2, dist[5]=2
Answer: dist[5] = 2
```

### TypeScript Implementation — BFS Template

```typescript
function bfs(graph: Map<number, number[]>, start: number): Map<number, number> {
    const dist = new Map<number, number>();
    const queue: number[] = [start];
    dist.set(start, 0);

    while (queue.length > 0) {
        const node = queue.shift()!;   // O(n) — use a proper deque for large inputs

        for (const neighbor of (graph.get(node) ?? [])) {
            if (!dist.has(neighbor)) {
                dist.set(neighbor, dist.get(node)! + 1);
                queue.push(neighbor);
            }
        }
    }

    return dist;
}
```

### TypeScript Implementation — Number of Islands (BFS flood fill)

```typescript
function numIslands(grid: string[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function bfs(r: number, c: number): void {
        const queue: [number, number][] = [[r, c]];
        grid[r][c] = '0';  // mark visited by mutating (or use a visited set)

        while (queue.length > 0) {
            const [row, col] = queue.shift()!;
            for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                    grid[nr][nc] = '0';
                    queue.push([nr, nc]);
                }
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                bfs(r, c);
            }
        }
    }

    return count;
}
```

---

## Method 2 — DFS (Depth-First Search)

Go as deep as possible before backtracking. Uses recursion (implicit stack) or an explicit stack.

```
Graph:  1 - 2 - 5
        |   |
        3 - 4
DFS from 1:

visit 1 → visit 2 → visit 5 (dead end, back)
         → visit 4 → visit 3 (dead end, back)
All visited: 1,2,5,4,3
```

### TypeScript Implementation — DFS Template (Recursive)

```typescript
function dfs(
    graph: Map<number, number[]>,
    node: number,
    visited: Set<number>
): void {
    visited.add(node);

    for (const neighbor of (graph.get(node) ?? [])) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Count connected components
function countComponents(n: number, edges: number[][]): number {
    const graph = new Map<number, number[]>();
    for (let i = 0; i < n; i++) graph.set(i, []);
    for (const [u, v] of edges) {
        graph.get(u)!.push(v);
        graph.get(v)!.push(u);
    }

    const visited = new Set<number>();
    let components = 0;

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(graph, i, visited);
            components++;
        }
    }

    return components;
}
```

### TypeScript Implementation — Cycle Detection (Directed Graph)

Three states per node: `0 = unvisited`, `1 = in current path (gray)`, `2 = fully processed (black)`.

```typescript
function hasCycle(numCourses: number, prerequisites: number[][]): boolean {
    const graph = new Map<number, number[]>();
    for (let i = 0; i < numCourses; i++) graph.set(i, []);
    for (const [a, b] of prerequisites) graph.get(b)!.push(a);

    const state = new Array(numCourses).fill(0);  // 0=unvisited 1=visiting 2=visited

    function dfs(node: number): boolean {
        if (state[node] === 1) return true;   // back edge → cycle!
        if (state[node] === 2) return false;  // already processed → safe

        state[node] = 1;                      // mark as being visited
        for (const neighbor of graph.get(node)!) {
            if (dfs(neighbor)) return true;
        }
        state[node] = 2;                      // fully processed
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (dfs(i)) return true;
    }
    return false;
}
```

---

## Method 3 — Topological Sort (Kahn's BFS Algorithm)

Order nodes of a DAG so every edge `u → v` has `u` before `v`. Use **in-degree** (number of incoming edges).

```
Courses: 0→1→3, 0→2→3   (must take 0 before 1, 0 before 2, 1&2 before 3)

In-degrees: 0:0  1:1  2:1  3:2

Start with in-degree 0 → queue: [0]
Process 0 → decrement neighbors 1,2 → both become 0 → queue: [1,2]  order=[0]
Process 1 → decrement 3 → in-degree 3 becomes 1  order=[0,1]
Process 2 → decrement 3 → in-degree 3 becomes 0 → queue: [3]  order=[0,1,2]
Process 3 → order=[0,1,2,3]
All nodes processed → no cycle ✓
```

### TypeScript Implementation — Course Schedule (Topological Sort)

```typescript
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph = new Map<number, number[]>();
    const inDegree = new Array(numCourses).fill(0);

    for (let i = 0; i < numCourses; i++) graph.set(i, []);
    for (const [course, pre] of prerequisites) {
        graph.get(pre)!.push(course);
        inDegree[course]++;
    }

    // Start with all nodes that have no prerequisites
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    const order: number[] = [];

    while (queue.length > 0) {
        const course = queue.shift()!;
        order.push(course);

        for (const next of graph.get(course)!) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }

    // If order has all courses → no cycle
    return order.length === numCourses ? order : [];
}
```

---

## Method 4 — Union Find (Disjoint Set)

Track connected components. Supports two operations: `find` (which component?) and `union` (merge two components).

```
Edges: (0,1), (1,2), (3,4)

parent = [0,1,2,3,4]  (each node is its own root)

union(0,1): root(0)=0, root(1)=1 → parent[1]=0
union(1,2): root(1)=0, root(2)=2 → parent[2]=0
union(3,4): root(3)=3, root(4)=4 → parent[4]=3

Components: {0,1,2}, {3,4} → count=2
```

### TypeScript Implementation — Union Find

```typescript
class UnionFind {
    private parent: number[];
    private rank: number[];
    count: number;

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);  // path compression
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rx = this.find(x);
        const ry = this.find(y);
        if (rx === ry) return false;  // already connected (cycle!)

        // Union by rank
        if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry;
        else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx;
        else { this.parent[ry] = rx; this.rank[rx]++; }

        this.count--;
        return true;
    }
}
```

---

## Side-by-Side Comparison

```
BFS                           DFS                           Topological Sort
─────────────────────         ─────────────────────         ─────────────────────
Queue (FIFO)                  Stack / Recursion             Queue + in-degree array
Level by level                Deep then backtrack           Process 0 in-degree first
Shortest path guaranteed      Full path exploration          Produces linear ordering
Visited set / dist map        Visited set / color array     Detects cycle if |order|<n
```

---

## Quick-Pick Template Guide

```
"Shortest path in unweighted graph / grid"
    → BFS, distance from source

"Number of islands / connected components in grid"
    → BFS or DFS flood fill

"All paths / path existence"
    → DFS

"Detect cycle in directed graph"
    → DFS with 3-color (0/1/2) marking

"Detect cycle in undirected graph"
    → DFS with parent tracking, or Union Find

"Course schedule / task ordering with dependencies"
    → Topological Sort (Kahn's BFS)

"Number of connected components in graph"
    → Union Find or DFS count

"Redundant connection / detect which edge creates a cycle"
    → Union Find (union returns false when cycle detected)
```

---

## The Graph Contract

```
BFS:  1. Add start to queue + mark visited
      2. Pop from front, process, add unvisited neighbors
      3. Stop when queue empty or target found

DFS:  1. Mark node visited (or gray)
      2. Recurse on unvisited neighbors
      3. Mark node finished (or black) after all neighbors processed

Topo: 1. Build graph + compute in-degrees
      2. Seed queue with all in-degree 0 nodes
      3. Pop, decrement neighbors, re-seed when in-degree hits 0
```

---

*Time complexity: O(V + E) for BFS, DFS, and Topological Sort. Union Find: O(α(n)) ≈ O(1) per operation with path compression + union by rank.*
