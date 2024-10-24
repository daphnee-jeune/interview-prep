// https://www.youtube.com/watch?v=Rs7ARD5TCFU

// The native js fn takes in an array of promises and returns an array of the resolved values in the order of the promises taken in in the input. It should reject if anyone of the promises reject
const promiseAll = (promises) => {
  const output = []; // create the array of promises
  let settledPromiseCounter = 0; // number of promises
  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      promise
        .then((value) => {
          output[i] = value;
          settledPromiseCounter++;
          // if all promises are resolved, then resolve the main outputs array of promises
          if (settledPromiseCounter === promises.length) {
            resolve(output);
          }
        })
        .catch(reject);
    });
  });
};

// instantiate 2 resolved promises to test fn
const promises1 = [Promise.resolve(2), Promise.resolve("resolved")];
promiseAll(promises1);

// instantiate rejected promise to test fn
const promises2 = Promise.reject("error");
promiseAll(promises2);

const deepEquals = (value1, value2) => {
  // If both values are strictly equal, return true
  if (value1 === value2) return true;
  // Check if either value is null or if the types are different
  if (value1 === null || value2 === null || typeof value1 !== typeof value2) return false;
  // If the values are objects (including arrays), do a deep comparison
  if (typeof value1 === 'object' && typeof value2 === 'object') {
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

const getTimer = (isoDate) => {
  console.log("getTimer");
};

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

// Example usage:
const saveInput = debounce(() => {
  console.log("Saving data...");
}, 300);

// Attaching the debounced function to an input event
document.getElementById("inputField").addEventListener("input", saveInput);

// https://www.youtube.com/watch?v=h4i4kjwncoU&t=5742s
// isPalindrome
String.prototype.isPalindrome = function () {
  // split the str by char, reverse the order, then join them back to a new str
  let reversedStr = this.split("").reverse().join("");
  return String(this) === reversedStr ? true : false;
};

console.log("racecar".isPalindrome()); // true
console.log("hello".isPalindrome()); // false

// Map: first arg is a callback to iterate through each item within the array it's being called on. returns a new reference of the array
Array.prototype.myMap = function (cb) {
  const returnArr = [];
  for (let i = 0; i < this.length; i++) {
    returnArr[i] = cb(this[i]);
  }
  return returnArr;
};

// Flatten: returns a new 1 dimensional array no matter how deeply nested it is
Array.prototype.flatten = function () {
  const result = [];
  // loop over this
  // is it an array?
  // no = push to result
  // yes = loop through this array (recursively?)
  for (const value of this) {
    if (Array.isArray(value)) {
      const flattened = value.flatten();
      result.push(...flattened); // bc the line above is an array so it needs to be spread
      // OR
      value.flatten().forEach((item) => result.push(item));
    } else {
      result.push(value);
    }
    return result;
  }
};

// getElementById: returns the node with the ID found in it
Document.prototype.myGetElementById = function (id) {
  // go through document and do a breadth first or depth first search to check each  node
  // this === document to start
  // if id isnt found, call on next child element
  // assume all html elements
  // recursion
  // not keep using document!
  // if no children, return out of that tree
  // if children, check for id property
  // if not found then keep recursing with next child
  // if found, return
  // if never found, return null
  // the children property is an html collection that can be treated like an array

  // if there are children nodes, loop through them and search for the id
  for (const element of this.children) {
    if (element.id === id) return element;
    // be careful not to keep using "document"
    const found = Document.prototype.myGetElementById.call(element, id); // this value will be element, instead of referencing the document
    if(found) return found; // returns the node
    element.myGetElementById(id);
  }
  return null;
};
