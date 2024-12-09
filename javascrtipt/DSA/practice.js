// HASHTABLES
// Group anagrams: Given an array of strings, group anagrams together
const groupAnagrams = (strs) => {
  const map = new Map();

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }
  return Array.from(map.values());
};

// Leetcode: 560
const topKFrequentIterative = (nums, k) => {
  const map = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((entry) => entry[0]);
};

// Subarray Sum Equals K
const subArraySumIterative = (nums, k) => {
  let count = 0;
  let sum = 0;
  const map = new Map();
  map.set(0, 1);

  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
};

// Two sum
// Time and space: O(n) where n is the size of the input array
const twoSums = (nums, target) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  throw new Error("No complement found");
};

// Invert a binary tree
const invertTree = (root) => {
  if (!root) return null; // base edge case

  // swap left and right children of the current node
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // recursively invert left and right subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// TREES
//     1
//    / \
//   2   3
//  / \
// 4   5
// In-order: [4, 2, 5, 1, 3]
// Pre-order: [1, 2, 4, 5, 3]
// Post-order: [4, 5, 2, 3, 1]

// Binary Tree Inorder Traversal (Depth First Search (DFS))
// Left → Root → Right (used for Binary Search Trees to retrieve sorted order)
// Time and space: O(n) due to the stack and the result array
const inOrderReversal = (root) => {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left; // Left
    }
    current = stack.pop();
    result.push(current.val); // Root
    current = current.right; // Right
  }
  return result;
};

// Root → Left → Right (useful for creating a copy of the tree)
const preOrderTraversal = (root) => {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    if (current) {
      result.push(current.val); // Root
      stack.push(current); // Push the current node for backtracking
      current = current.left; // Left
    } else {
      current = stack.pop(); // Backtrack to the previous node
      current = current.right; // Right
    }
  }
  return result;
};
// Left → Right → Root (useful for deleting or processing all child nodes before the parent)
const postOrderTraversal = (root) => {
  const result = [];
  const stack = [];
  let current = root;
  let lastVisited = null; // Last visited node

  while (current || stack.length > 0) {
    if (current) {
      stack.push(current);
      current = current.left; // Left
    } else {
      const peekNode = stack[stack.length - 1]; // Look at the top of the stack
      if (peekNode.right && lastVisited !== peekNode.right) {
        current = peekNode.right; // If the right subtree exists and hasn't been visited, move there
      } else {
        result.push(peekNode.val); // Process the root node after children
        lastVisited = stack.pop(); // Mark the node as visited
      }
    }
  }
  return result;
};

// Leetcode problem 102: Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
// breadth-first search (queue) O(n) (each node is processed once)
const binaryTreeLevelOrderIterative = (root) => {
  if (!root) return []; // handle edge case

  const result = [];
  const queue = [root]; // initialize queue with the root node

  while (queue.length > 0) {
    const levelSize = queue.length; // number of nodes in current level
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift(); // remove first node from the queue
      currentLevel.push(currentNode.val); // add its val to currentLevel

      // add child nodes of the next level to the queue
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    result.push(currentLevel);
  }
  return result;
};
// O(n) (each node is visited once).
const binaryTreeLevelOrderRecursive = (root) => {
  const result = [];

  const traverse = (node, level) => {
    if (!node) return; // handle empty tree edge case

    if (result.length === level) {
      // push current level if it's not yet in the result
      result.push([]);
    }

    result[level].push(node.val); // add current node's val to its level

    // handle for left and right
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  };
  traverse(root, 0); // start from the root
  return result;
};

// Leetcode problem 105: Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
const buildTreeIterative = (preorder, inorder) => {
  if (!preorder.length || !inorder.length) return null; // handle edgecase
  const root = { val: preorder[0], left: null, right: null }; // tree root
  const stack = [root];
  let inorderIndex = 0; // pointer for inorder traversal

  for (let i = 0; i < preorder.length; i++) {
    const node = { val: preorder[i], left: null, right: null }; // new node
    let parent = stack[stack.length - 1]; // check the top of the stack

    if (parent.val !== inorder[inorderIndex]) {
      // if the current node's value doesn't match the inorder value, it's the left child
      parent.left = node;
    } else {
      // If it matches, backtrack until we find the parent to attach as the right child
      while (
        stack.length &&
        stack[stack.length - 1].val === inorder[inorderIndex]
      ) {
        parent = stack.pop();
        inorderIndex++;
      }
      parent.right = node;
    }
    stack.push(node); // push the current node onto the stack
  }
  return root; // return the constructed tree
};

const buildTreeRecursive = (preorder, inorder) => {
  if (!preorder.length || !inorder.length) return null; // base case

  const rootVal = preorder[0]; // the first value in preorder is the root
  const root = { val: rootVal, left: null, right: null }; // create the root node

  const rootIndex = inorder.indexOf(rootVal); // find root's index in inorder

  // left subtree uses elements before the root in inorder
  // and the corresponding elements in preorder
  root.left = buildTreeRecursive(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );

  // right subtree uses elements after the root in inorder and the corresponding elements in preorder
  root.right = buildTreeRecursive(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return root; // return the constructed tree
};
