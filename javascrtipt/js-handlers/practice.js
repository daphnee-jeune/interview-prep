// A new promise is created that will resolve when all input promises resolve or reject if any of them reject.
// We initialize an empty array results to store the resolved values of each promise and a counter completedPromises to keep track of how many promises have been completed.
// We use Promise.resolve() to ensure that each element in the array is treated as a promise (even if it’s not initially a promise).
// For each promise:
// If it resolves, store its result in the correct position in the results array and increment the counter.
// If all promises resolve, call resolve(results) to resolve the custom promise with the array of results.
// If any promise rejects, the custom promise immediately rejects with the error.
// If the input array is empty, it immediately resolves with an empty array (like Promise.all([]) does).
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

const promiseAlll = (promises) => {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }
    promises
      .forEach((promise, i) => {
        Promise.resolve(promise).then((result) => {
          results[i] = result;
          completed++;
        });
        if (completed === results.length) {
          resolve(results);
        }
      })
      .catch((err) => reject(err));
  });
};

// A new array is initialized.
// The for loop iterates through each element in the input array.
// The callback function is applied to each element, and the result is pushed into the result array.
// After all elements are processed, the result array is returned.
const myMap = (arr, cb) => {
  const returnArr = [];
  for (let i = 0; i < this.length; i++) {
    returnArr.push(cb(arr[i], i, arr));
  }
  returnArr;
};

// Create an empty array (result) to store the flattened result.
// Iterate through each element of the input array using forEach().
// If the current element is an array (Array.isArray(element)), recursively call customFlatten() to flatten the nested array.
// If the current element is not an array, push it to the result.
// After processing all elements, return the result array.
const flattenArr = (arr) => {
  let result = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      result = result.concat(flattenArr(element));
    } else {
      result.push(element);
    }
  });
  return result;
};

// Base Case: If the current element's id matches the target id, return that element.
// Recursive Case: If the current element has child elements, iterate through them recursively by calling customGetElementById on each child.
// If none of the child elements matches, continue searching deeper in the DOM tree.
// Return null if no element with the given id is found after traversing the tree.
const myGetElementById = (id, element = document.body) => {
  if (element.id === id) return element;

  for (let child of element.children) {
    const found = myGetElementById(id, child);
    if (found) return found;
  }
  return null;
};

// Extract the names and return them in a flat array
const company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 }
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 }
    ],
    internals: [
      { name: "Jack", salary: 1300 }
    ]
  }
};
const getNames = (obj) => {
  let names = []
  for(let key in obj){
    if(Array.isArray(obj[key])){
      obj[key].forEach(item => {
        if(item.name){
          names.push(item.name)
        }
      })
    } else if (typeof obj[key] === 'object' && obj[key] !== null){
      names = names.concat(getNames(obj[key]))
    }
  }
  return names
}

// Return the sum of all salaries within this data structure
const sumSalaries = obj => {
  const totalSalaries = 0

  for(let key in obj){
    if(Array.isArray(obj[key])){
      obj[key].forEach(item => {
        if(item.salary){
          totalSalaries += item.salary
        }
      })
    } else if(typeof obj[key] === 'object' && obj[key] !== null){
      totalSalaries += sumSalaries(obj[key])
    }
  }
  return totalSalaries
}

// Given a list of list of numbers, find the largest and smallest number and return a sum of the largest and smallest numbers for each row. Return sum of all the numbers from each row.
const numbers = ['234', '45', '4', '98', '22', '111']
const minMaxSum = arr => {
  let min = Math.min(...arr)
  let max = Math.max(...arr)
  return min + max
}

 // OR
const sumOfMinAndMax = numbers => {
  let totalSum = 0
  for(let num of numbers){
    const nums = num.split('').map(Number)
    const largest = Math.max(...nums)
    const smallest = Math.min(...nums)

    const numSum = largest + smallest
    totalSum += numSum
  }
  return totalSum
}