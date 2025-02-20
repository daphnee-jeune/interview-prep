// 1. Understand the Problem
// Read the problem statement carefully.
// Ask clarifying questions if anything is unclear.
// Break the problem into smaller, manageable parts.
// 2. Start Simple
// Begin with the most straightforward solution that meets the requirements.
// Avoid adding unnecessary features, abstractions, or optimizations upfront.
// 3. Write Clean and Readable Code
// Use meaningful variable and function names.
// Keep functions small and focused on a single responsibility.
// Avoid overly complex constructs (e.g., nested ternaries, excessive chaining).
// 4. Avoid Premature Optimization
// Focus on correctness and readability first.
// Optimize for performance or edge cases only if explicitly required.
// 5. Test Your Solution
// Write simple test cases to verify correctness.
// Cover edge cases (e.g., empty strings, null, undefined, unexpected inputs).
// 6. Avoid Overusing Advanced Features
// Stick to basic language constructs unless advanced features are necessary.
// Avoid unnecessary use of generics, decorators, or complex type systems.
// 7. Communicate Your Thought Process
// Explain your approach before writing code.
// Mention any assumptions or trade-offs you’re making.
// Ask for clarification if unsure about edge cases.
// 8. Practice Common Patterns
// Familiarize yourself with common coding patterns (e.g., type checking, string manipulation, array operations).
// Use these patterns to solve problems quickly and effectively.
// 9. Stay Calm and Iterate
// Don’t panic if you don’t know the perfect solution immediately.
// Start with what you know and improve the solution iteratively.
// Focus on the problem-solving process, not just the final code.
// 10. Review and Refactor (If Time Permits)
// Once you have a working solution, review it for simplicity and readability.
// Refactor only if it improves clarity or addresses a specific issue.

// Check if the value is a non empty string
// input: 'something' || 444 || null | undefined
// output: true or false
// plan: check on param type && ensure str does not contain white space
const isStringPresent = (str) => {
  return typeof str === "string" && str.trim() !== "";
};

// Sum all numbers in an array
// input: [44, 5, 77, 94]
// output: 220
// plan: iterate through arr and check on typeof el. then sum up all the nums
const sumUpNums = (arr) => {
  // if(!arr.length) return 0 ** Not needed bc it handles edge cases like an empty array by starting the accumulator at 0
  return arr.reduce((acc, curr) => {
    if (typeof curr === "number") {
      acc + curr;
    }
    return acc;
  }, 0);
};

// Find the longest word in a sentence
// input: 'I love Javascript'
// output: 'Javascript'
// plan: split the sentence by the space to isolate the words, loop through each word and compare their length to each other
const longestWord = (sentence) => {
  // if(!sentence.length) return  Not needed bc it handles edge cases like an empty string by starting the accumulator at ''
  return sentence.split(" ").reduce((word, longest) => {
    word.length > longest.length ? word : longest;
  }, "");
};

// Flatten a nested arr
// input: [a, b, [c, d [e ,f, g]]]
// output: [a, b, c, d , e, f, g]
// plan: iterate through array. if el is an array then update result arr with recursively flatten call, else, update result arr with el
const flattenArray = (arr) => {
  return Array.isArray(arr) ? arr.flatMap((el) => flattenArray(el)) : [el];
};
// OR
const flattedArrray = (arr) => {
  const result = [];
  if (!arr.length) return [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flattedArrray(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

// Find the First Non-Repeating Character in a String
// input: 'swiss'
// output: 'w' or null if non exists
// plan: create an obj to keep track of chars count. loop through the str and count occurrences of each char. Find the 1st char with only 1 occurrence
const findNonRepeatingChar = (str) => {
  if (!str.length) return;
  const charCount = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }
};

// Find the Length of The Longest Substring Without Repeating Characters
// input: 'abcabcbb'
// output: 3
// plan: use two pointers (left and right) to represent the current window of the substring. use a Set or Map to track unique characters in the window.
const longestSubstringWithoutRepeats = (str) => {
  let left = 0; // Left pointer of the window
  let maxLen = 0; // Maximum length of substring without repeats
  const charSet = new Set(); // Set to track unique characters

  for (let right = 0; right < str.length; right++) {
    // If the character is already in the set, move the left pointer
    while (charSet.has(str[right])) {
      charSet.delete(str[left]);
      left++;
    }
    // Add the current character to the set
    charSet.add(str[right]);
    // Update the maximum length
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    // clear the previous timeout to prevent multiple executions
    clearTimeout(timer);
    // set a new timeout to execute the function after the delay
    timer = setTimeout(() => {
      fn.apply(this, args); // preserve the context and pass arguments
    }, delay);
  };
};
const searchInput = document.getElementById("search");
const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);
searchInput.addEventListener("input", (e) => debouncedSearch(e.target.value));
