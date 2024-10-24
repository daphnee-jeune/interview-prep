// Coding Q:
// Get your javascript fundamentals down - map, reduce, filter, splice, slice, shift, unshift, push, etc
// Build a lot of mini projects - calculator, forms, carousel, data-fetching, etc (frontendeval)
// Leetcode (easy and medium) - you can do hard as well but I prioritized those first (leetcode)
// Connect the dots: dfs, bfs, recursion, etc - all of these sound great but if I had to render it on the browser, how would I do that?

// 1. What is the output of the following code?
const b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Let is block scoped so each iteration has its own instance of i within the loop
// so the setTimeout will correctly reference the val of i
for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(b[i]), 1000);
}
// Var is function scoped so there is only 1 i for the entire loop
// so by the time the setTimeout runs after the 1sec, the for loop has already completed and the val of i is 10
// Since the i is 10 when the callback executes it tries to access b[10] which is undefined because the loop runs from 0 - 9
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(b[i]), 1000);
}

// 2. Turn an Object into an Array
const obj = { a: 1, b: 2, c: 3 };
const arr1 = Object.keys(obj); // creates an array with keys => ['a', 'b', 'c]
const arr2 = Object.values(obj); // creates an array with vals => [1, 2, 3]
const arr3 = Object.entries(obj); // creates a nested array with the keys and vals => [['a', 1], ['b', 2], ['c', 3]]

// 3. Write the code to find the vowels
const countVowels = (str) => {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let char of str.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
};

// 4. Write the code given If two strings are anagrams of one another, then return true.
const areAnagrams = (str1, str2) => {
  const lowercaseStr = (str) => str.toLowerCase();
  const sortStr = (str) => str.split("").sort().join("");
  return sortStr(lowercaseStr(str1)) === sortStr(lowercaseStr(str2));
};

// 5. Write the code for dynamically inserting new components *******
function addNode() {
  var newP = document.createElement("p");
  var textNode = document.createTextNode(" This is another node");
  newP.appendChild(textNode);
  document.getElementById("parent1").appendChild(newP);
}

// 6. Implement a function that returns an updated array with r right rotations on an array of integers a
const rotateArr = (arr, num) => {
  const length = arr.length;
  num = num % length;
  if (num === 0) return arr;
  return arr.slice(-pos).concat(arr.slice(0, -pos));
};


