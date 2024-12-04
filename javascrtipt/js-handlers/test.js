const removeDupes = (arr) => [...new Set(arr)];
const greaterThan = (arr, val) => arr.filter((el) => el > val);
const findLargest = (arr) => Math.max(...arr);
const reverseStr = (str) => str.split("").reverse().join("");
const secondLargest = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  return sortedArr[1];
};
const findSum = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};
const mergeAndSort = (arr1, arr2) => {
  return [...arr1, ...arr2].sort((a, b) => a - b);
};
const isPalindrome = (str) => {
  const reversedStr = str.toLowerCase().split("").reverse().join("");
  return str.toLowerCase() === reversedStr;
};
const numOfOccurrences = (str, char) => {
  return str.split(char).length - 1;
};
const countVowels = (str) => {
  const vowels = "aeiou";
  return str
    .toLowerCase()
    .split("")
    .filter((el) => vowels.includes(el.toLowerCase())).length;
};
const otherCountVowels = (str) => {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let char of str.toLowerCase()) {
    if (vowels.includes(char)) count++;
  }
  return count;
};
const areAnagrams = (str1, str2) => {
  const normalizeStr = (str) => str.toLowerCase().split("").sort().join("");
  return normalizeStr(str1) === normalizeStr(str2);
};
const rotateArr = (arr, pos) => {
  const length = arr.length;
  pos = pos % length;
  return arr.slice(-pos).concat(arr.slice(0, -pos));
};
const commonEls = (arr1, arr2) => {
  return arr1.filter((el) => arr2.includes(el));
};
const findPairs = (arr, target) => {
  const pairs = [];
  const uniqueArrVals = new Set();
  arr.forEach((num) => {
    const complement = target - num;
    if (uniqueArrVals.has(complement)) pairs.push([complement, num]);
    uniqueArrVals.add(num);
  });
  return pairs;
};
const flattenArr = (arr) => {
  const result = [];
  arr.forEach((el) => {
    if (Array.isArray(el)) {
      result.push(...flattenArr(el));
    } else {
      result.push(el);
    }
  });
  return result;
};
const flattenOtherArr = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenOtherArr(item) : item);
  }, []);
};
const capitalize = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
const longestWord = (sentence) => {
  return sentence
    .split(" ")
    .reduce(
      (currWord, longestWord) =>
        longestWord.length > currWord.length ? longestWord : currWord,
      ""
    );
};
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
const rotateArray = (arr, pos) => {
  const length = arr.length;
  pos = pos % length;
  return arr.slice(-pos).concat(arr.slice(0, -pos));
};
const removeFalse = (arr) => {
  return arr.filter(Boolean);
};
const mostFrequent = (arr) => {
  const obj = arr.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});
  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
};
const longestSubstr = (str) => {
  let maxLength = 0;
  let current = "";

  for (let char of str) {
    if (current.includes(char)) {
      current = current.slice(current.indexOf(char) + 1);
    }
    current += char;
    maxLength = Math.max(maxLength, current.length);
  }

  return maxLength;
};
const binarySearch = (arr, target) => {
  if (arr.length === 0) return;
  const sorted = arr.sort((a, b) => a - b);
  const left = 0;
  const right = sorted.length - 1;

  while (left < target) {
    const mid = Math.floor((left + right) / 2);
    if (mid === target) return mid;
    if (left < mid) {
      left = left + 1;
    } else {
      right = right - 1;
    }
  }
  return "Not found";
};

// undo / redo feature
class UndoRedoManager {
  constructor() {
    this.history = []; // stack for undo
    this.redoStack = []; // stack for redo
  }

  // add a new action
  addAction(action) {
    this.history(action);
    this.redoStack = []; // clear redo stack after new action
  }

  // undo the last action
  undo() {
    if (!this.history.length) {
      throw new Error("No actions to undo");
    }
    const action = this.history.pop();
    this.redoStack.push(action);
    return action;
  }

  // redo the last undone action
  redo() {
    if (!this.redoStack.length) {
      throw new Error("No actions to redo");
    }
    const action = this.redoStack.pop();
    this.history.push(action);
    return action;
  }

  // get current state of the undo stack
  getHistory() {
    return [...this.history];
  }

  // get current state of the redo stack
  getRedoStack() {
    return [...this.redoStack];
  }
}
