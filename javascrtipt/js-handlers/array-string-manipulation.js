/*--------------------------------- EASY -------------------------------------*/

/*--------------------------------- ARRAYS -------------------------------------*/
// Remove duplicates from an array
const removeDupes = (arr) => {
  return [...new Set(arr)];
};
// console.log(removeDupes([1, 2, 3, 4, 4, 5, 2])); // [1, 2, 3, 4, 5]

// Find the largest number in an array
const findLargest = (numArr) => {
  return Math.max(...numArr);
};
// console.log(findLargest([3, 5, 7, 2, 8])); // 8

// Find the second larget num in an array
const secondLargest = (arr) => {
  const sorted = arr.sort((a, b) => a - b); // sort by desc
  return sorted[1]; // grab second el in array
};
// console.log(secondLargest([10, 5, 8, 12, 5, 8])); // 10

// Find the sum of all numbers in an array
const findSum = (numArr) => {
  return numArr.reduce((acc, curr) => acc + curr, 0);
};
// console.log(sumArray([1, 2, 3, 4, 5])); // 15

// Merge Two Arrays and Sort
const mergeAndSort = (arr1, arr2) => {
  return [...arr1, ...arr2].sort((a, b) => a - b);
};
// console.log(mergeAndSort([3, 5, 1], [8, 2, 4])); // [1, 2, 3, 4, 5, 8]

// Find Elements Greater Than a Given Value
const findGreaterThan = (arr, val) => {
  return arr.filter((el) => el > val);
};
// console.log(findGreaterThan([2, 5, 8, 1, 4], 4)); // [5, 8]

// Flatten a nested array
const flattenArr = (arr) => {
  let result = [];
  // loop through each sub array
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      // flatten them if they are an array
      result.push(...element);
    } else {
      // if not, then push into the result array to be returned
      result.push(element);
    }
  });
  return result;
};
// console.log(flattenArr([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]

/* ------------------------------- STRINGS ------------------------------------- */
// Reverse a string
const reverseStr = (str) => {
  return str.split("").reverse().join("");
};
// console.log(reverseString("hello")); // "olleh"

// Palindrome
const isPalindrome = (str) => {
  const reversedStr = str.split("").reverse().join("");
  return str.toLowerCase() === reversedStr.toLowerCase();
};
// console.log(isPalindrome("madam")); // true

// Number of vowels
const countVowels = (str) => {
  const vowels = "aeiou";
  return str
    .toLowerCase() // match the case sensitivity
    .split("") // turn into an array
    .filter((char) => vowels.includes(char)).length; // filter to compare each char against the string of vowels and return the length
};
// console.log(countVowels("JavaScript")); // 3

// Capitalize the First Letter of Each Word
const capitalize = (sentence) => {
  return sentence
    .split(" ") // turn into an array of words
    .map((word) => word[0].toUpperCase() + word.slice(1)) // loop through each letter in the words and capitalize the first letter and concat with the rest of the word
    .join(" "); // turn back into a string
};
// console.log(capitalize("hello world")); // "Hello World"

// Find the Longest Word in a Sentence
const longestWord = (sentence) => {
  return sentence
    .split(" ") // turn into an array of words
    .reduce(
      (longest, word) => (word.length > longest.length ? word : longest),
      ""
    ); // loop through each word and compare against the next word to return the longest one
};
// console.log(longestWord("The quick brown fox jumps over the lazy dog")); // "jumps"

// Count occurrences of a Character in a String
const numOfOccurrences = (str, char) => {
  return str.split(char).length - 1;
};
// console.log(countOccurrences("banana", "a")); // 3

// Anagrams
const isAnagram = (str1, str2) => {
  const normalizeString = (str) => str.toLowerCase().split("").sort().join("");
  return normalizeString(str1) === normalizeString(str2);
};
// console.log(isAnagram("listen", "silent")); // true

// Find Common Elements Between Two Arrays
const commonElements = (arr1, arr2) => {
  return arr1.filter((el) => arr2.includes(el));
};
// console.log(findCommonElements([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

/*--------------------------------- MEDIUM -------------------------------------*/

/*------------------------------- ARRAYS -----------------------------------*/
// Write a function that performs binary search on a sorted array.
const binarySearch = (arr, target) => {
  let left = 0; // beggining of arr
  let right = arr.length - 1; // end of arr

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // find the mid point
    if (arr[mid] === target) return mid; // if target is the mid, return mid
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};
// Write a function that splits an array into smaller arrays (chunks) of a specified size.
const chunkArray = (arr, size) => {
  const chunks = []; // initialize array to hold sub arrays
  for (let i = 0; arr.length; i += size) {
    // The loop increments i by size on each iteration, meaning each slice of the array will begin size elements further along than the previous slice.
    chunks.push(arr.slice(i, i + size)); // method is used to create a new array from arr, starting at index i and ending just before i + size.
  }
  return chunks;
};
// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// Write a function that rotates an array to the right by a given number of positions.
const rotateArr = (arr, pos) => {
  const len = arr.length;
  pos = pos % len; // modify the pos value to account for when the number of positions is > the array length
  return arr.slice(-pos).concat(arr.slice(0, -pos)); // slices the arr from the beginning (0) up to the part of the array that will stay at the back after rotation. The concat() method is used to join the two parts of the array together. It takes the sliced portion from the end and concatenates it with the sliced portion from the front, completing the rotation.
};
// console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]

// Find All Pairs in an Array that Sum to a Target
const findPairs = (arr, target) => {
  const pairs = []; // array of pairs to return
  const uniqueArrVals = new Set(); // remove duplicates

  // for each num in the array, if the set contains the complement, push the num and complement into the pairs array
  arr.forEach((num) => {
    const complement = target - num;
    if (uniqueArrVals.has(complement)) {
      pairs.push([complement, num]);
    }
    uniqueArrVals.add(num);
  });
  return pairs;
};
// console.log(findPairs([1, 2, 3, 4, 5, 6, 7], 8)); // [[3, 5], [2, 6], [1, 7]]

// Flatten a deeply nested array
const flattenDeep = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenDeep(item) : item);
  }, []);
};
// console.log(flattenDeep([1, [2, [3, [4, 5]]]])); // [1, 2, 3, 4, 5]

// Write a function that returns the common elements (intersection) between two arrays.
const findIntersection = (arr1, arr2) => {
  return arr1.filter((num) => arr2.includes(num));
};
// console.log(intersection([1, 2, 3, 4], [2, 4, 6, 8])); // [2, 4]

// Write a function that removes all falsy values (false, 0, "", null, undefined, and NaN) from an array.
const removeFalsy = (arr) => {
  return arr.filter(Boolean);
};
// console.log(removeFalsy([0, 1, false, 2, "", 3, null, undefined, NaN])); // [1, 2, 3]

// Find the Most Frequent Element in an Array
const mostFrequent = (arr) => {
  // accumulate the frequency of each item in the array into an object (map)
  // map is the accumulator object that will hold the frequency count of each item
  // item is the current item in the array being processed during each iteration of reduce
  const frequencyMap = arr.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1; // This line This increments the frequency of item by 1
    return map;
  }, {});
  // creates an array of all the keys (unique items) in the frequencyMap
  return Object.keys(frequencyMap).reduce((a, b) =>
    // For each pair of items a and b, we compare their frequencies using frequencyMap[a] and frequencyMap[b]. If the frequency of a is greater than that of b, return a (i.e., keep a as the current "most frequent" item). Otherwise, return b.
    frequencyMap[a] > freqMap[b] ? a : b
  );
};
// console.log(mostFrequent([1, 2, 3, 1, 2, 1])); // 1

// Debounce
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    // Clear the timeout if a new event occurs within the delay period
    clearTimeout(timeoutId);
    // Set a new timeout to call the function after the delay period
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/* ------------------------------- STRINGS ------------------------------------- */

// Longest Substring Without Repeating Characters
const longestUniqueSubString = (str) => {
  let maxLength = 0; // keeps track of the length of the longest substring without repeating characters.
  let current = ""; // holds the current substring of unique characters as we iterate through the input string.
  for (let char of str) {
    // iterates over each character
    // If char is found in current, we found a repeated char. In this case, we need to "reset" the substr starting from the character after the first occurrence of the repeated character:
    if (current.includes(char)) {
      // checks if the current char) is already part of the current substring
      current = current.slice(current.indexOf(char) + 1); //indexOf Finds the index of the first occurrence of the repeated character. .slice slices the string to remove the part before (and including) the first occurrence of the repeated character.
    }
    current += char; // add the current (char) to the current substring.
    maxLength = Math.max(maxLength, current.length); // compares the current length of current with maxLength. If current.length is greater than maxLength, it updates maxLength to the new value.
  }
  // holds the length of the longest substring without repeating char
  return maxLength;
};
// console.log(longestUniqueSubstring("abcabcbb")); // 3 ("abc")

// https://youtu.be/yju4zwKSriI?si=In4T-t-ow7GlYbrN
// Input: 'cat','car', 'bar'
// setup(['cat','car', 'bar'])
// isInDict('cat') //true
// isInDict('lol') //false
// isInDict('*ol') // true
// isInDict('cr8') // false
// Create a fn that consumes a dictionary and stores in some format. Then create a handler that looks for a specific string within the dictionary and returns a boolean whether or not it finds it
class Dictionary {
  constructor(wordsArray) {
    // turn arr into obj of every possible permutations
    const wordMap = wordsArray.reduce((acc, word) => {
      acc[word] = true;

      word.split("").forEach((letter, i) => {
        const start = word.slice(0, i);
        const end = word.slice(i + 1);

        const partialWord = `${start}*${end}`;
        acc[partialWord] = true;
      });
      return acc;
    }, {});
    this.dict = wordMap;
  }
  isInDict(word) {
    return !!this.dict(word);
    // if (!word.includes("*")) return false; // On

    // return Object.values(this.dict).some((dictWord) => {
    //   const regexTemplate = word.replaceAll("*", ".");
    //   const regex = new RegExp(`^${regexTemplate}$`);
    //   return regex.test(dictWord);
    // });
  }
  // return thisl.dict.includes(word)
}
// O1 bc of constructor that sets it to be an array. But then some would be On since we're iterating through every word in the words array.
const test = new Dictionary(["cat", "car", "bar"]);
console.log(test.isInDict("cat")); //true
console.log(test.isInDict("lol")); //false

const myPromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    // returns a new promise.
    let results = []; // will hold the resolved values of each promise in the same order they appear in the input array.
    let completedPromises = 0; // When this equals the length of the promises array, that means all promises have resolved so we can resolve(results).
    if (promises.length === 0) {
      // If the promises array is empty, there's no work to do
      resolve([]);
      return;
    }
    promises // sets up the logic for handling each promise in the array individually.
      .forEach((promise, i) => {
        // loops through each promise in the promises array, and i is the index of the current promise.
        // ensure that each item is a promise
        Promise.resolve(promise).then((result) => {
          // ensures that each item in the array is treated as a promise
          results[i] = result; // when a promise resoves, the result is stored in the results array at the same index (i) as the original promise in the input array; ensuring the order of the results matches the order of the promises
          completedPromises++; // increments to track how many promises have resolved so far
        });

        // checks if the number of completed promises equals the total number of promises. If they are all complete, the promise returned by myPromiseAll is resolved with the results array, containing all the resolved values.
        if (completedPromises === promises.length) {
          resolve(results);
        }
      })
      // catch the error and immediately reject the entire myPromiseAll promise with the error.
      .catch((err) => reject(err));
  });
};
const deepEquals = (value1, value2) => {
  // If both values are strictly equal, return true
  if (value1 === value2) return true;
  // Check if either value is null or if the types are different
  if (value1 === null || value2 === null || typeof value1 !== typeof value2)
    return false;
  // If the values are objects (including arrays), do a deep comparison
  if (typeof value1 === "object" && typeof value2 === "object") {
    // Get the keys of both objects
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    // If the number of keys is different, the objects are not equal
    if (keys1.length !== keys2.length) return false;

    // Recursively compare the values of each key
    for (let key of keys1) {
      if (!deepEquals(value1[key], value2[key])) {
        return false;
      }
    }
    return true;
  }
  // If none of the above conditions are met, the values are not equal
  return false;
};
console.log(deepEquals(3, 5)); // false
console.log(deepEquals(3, "3")); // false
console.log(deepEquals(3, 3)); // true
