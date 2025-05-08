// FlattenArr
This function receives an array that contains sub arrays and these arrays may also contain sub arrays

Edge case:
if the array is empty, return

create a return array to hold the flattened elements
loop through each element
if the array element is an array, flatMap each element and push in a return array
if not, then push in results array
return results array
const flatten = arr => {
  const result = []
  if(!arr.length) return null
  arr.forEach(el => {
    if(Array.isArray(el)){
      result.push(...flatten(el))
    } else {
      result.push(el)
    }
  })
  return result
}

// Object path by key
You are given an object that contains nested objects, and your task is to implement a function that finds the path to a specified property within the object structure. The path is an array of keys representing the sequence of properties to reach the desired property. If the property is not found, the function should return null.

So the function takes in a nested object and a target key. The goal is to find a path to the target key and if found, return the path and if not return null
loop through each key in the obj
create path variable and add key in the variable
compare the looped key to the targetKey and if they're the same, return the path variable
continue on each element in the obj and if they are objects,
recursively call the function on the el and if the function returns true, then return it
if not, return null
const findPath = (obj, targetKey, path = []) => {
  for(const key in obj){
    let currentPath = [...path, key]
    if(key === targetKey){
      return currentPath
    } 
    if(typeof obj[key] === 'object' && obj[key] !== null){
      const result = findPath(obj[key], targetKey, currentPath)
      if(result){
        return currentPath
      }
    }
  }
  return null
}
// Anagram
Write a function that takes a list of strings as input and groups together the anagrams.
So the function takes in a list of strings and the goal is to return subarrays with words of the same letter
create a structure (i.e an object) to hold the values
loop through each word in the list 
create a variable to hold each of the words sorted
then if the key does not exists, create a one and assign it an empty array to hold the words with the same letters
and for each key, push the sorted word
lastly, return the object values
const groupAnagrams = list => {
  const groups = {}
  for(const word of list){
    const sorted = word.split('').sort().join('')
    if(!groups[sorted]){
      groups[sorted] = []
    }
    groups[sorted].push(word)
  }
  return Object.values(groups)
}

// First duplicate character
Given a string which might have duplicate letters, write a function to find the first duplicate.
So this function takes up a string and needs to find and return the first duplicate
const findDupe = str => {
  const seen = {}
  for(let i = 0; i < str.length; i++){
    let char = str[i]
    if(seen[char]){
      return char
    }
    seen[char] = true
  }
  return null
}

first if the string is empty, return null
loop through the string and compare each letter against the last,
return the first duplicate

// Merge sorted arrays
Given an array of arrays containing integers, write a function merge(arrList) that merges all the integers from the nested arrays into a single flat array and returns the sorted array in ascending order.
So this function takes in an array of integers and first will need to flatten the array then sort it n asc order
const mergeLists = list => {
  return list.flat().sort((a,b) => a - b)
}

// Deep clone
Implement a fn that takes an object and returns a deep copy of it
const deepClone = (obj) => {
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  let clone = Array.isArray(obj) ? [] : {}
  for(const key in obj){
    const value = obj[key]
    if(typeof value === 'object' && value !== null){
      clone[key] = deepClone(value)
    } else {
      clone[key] = value
    }
  }
  return clone
}

// Extract names
Create a function that returns all the names in this structure into an array
const data = {
  name: "Daph",
  children: [{
    name: 'Ari',
    children: []
  }],
  name: 'Marcus',
  children: [{
    name: 'Sophie',
  children: [{
    name: 'Alex'
  }]
  }]
}
const extractNames = obj => {
  const names = []
  if(obj.name){
    names.push(obj.name)
  }
  for(const key in obj){
    if(obj.children && obj.children !== null){
      names = names.concat(extractNames(obj[key]))
    }
  }
  return names
}

OR

const otherExtractNames = obj => {
  const topLevelNames = [obj.name]
  const nestedNames = (obj.children ?? []).flatMap(child => otherExtractNames(child))
  return [...topLevelNames, ...nestedNames]
}
// Extract all keys
Create a function that takes in an object and returns all keys in an array
const nestedObj = {
  name: "Alice",
  age: 30,
  details: {
    address: {
    city: "New York",
    zip: "10001"
  },
    job: "Engineer"
  }
}

So this function takes in a nested object and needs to return its keys in an array
First instantiate a new array
Then grab the top level keys and push them in the array
Then loop through the object and for each key
check if the key is an object and recursively call the function on that key
const extractKeys = obj => {
  const keys = []
  for(const key in obj){
    keys.push(key)
    if(obj[key] === 'object' && obj[key] !== null){
      keys = keys.concat(extractKeys(obj[key]))
    }
  }
  return keys
}

// sum up all numbers in nested obj
const values = {
a: 10,
b: { "c": { "d": 5 }, "e": 15 },
f: "non-numeric"
}
grab the object values and reduce them if they're a number.
and if they're not a number then recursively call the function on that value
const sumUpNums = data => {
  return Object.values(data).reduce((sum, curr) => {
    if(typeof curr === 'number'){
      return sum + curr
    } else if(typeof curr === 'object' && curr !== null){
      return sum + sumUpNums(curr)
    }
    return sum
  }, 0)
}

// Create a fn to grab the names in this object and return them in a flat array
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
const extractNames = obj => {
  const names = []
  for(const key in obj){
    if(Array.isArray(obj[key])){
      obj[key].forEach(el => {
      names.push(el.name)
    })
    } else if(typeof obj[key] === 'object' && obj[key] !== null){
      names = names.concat(extractNames(obj[key]))
    }
  }
  return names
}

So this funciton receives a nested object with two top tiers sales, and development, and two innter tiers, sites, and internals. I can loop through each keys, assert on the key being 'name' and grab its value if its the top level, then if the value is an object, recursively call the function on the nested key

// Return the authors values in an array from this data structure
const comments = {
  author: "Alice",
  text: "This is a great post!",
  replies: [
    {
    author: "Bob",
    text: "Thanks, Alice!",
    replies: [
    {
    author: "Charlie",
    text: "I agree with Bob.",
    },
    ],
    },
    {
    author: "Dave",
    text: "Nice discussion!",
    },
  ],
};
const getAuthors = data => {
  const authors = []
  if(data.author){
    authors.push(data.author)
  }
  if(data.replies && Array.isArray(data.replies)){
    data.replies(el => {
      authors.push(...getAuthors(el))
    })
  }
  return authors
}

Given an unsorted array of integers nums, return the length of the longest continuous increasing subsequence (subarray).The subsequence must be strictly increasing.
Input: nums = [1,3,5,4,7]
Output: 3 (1,3, 5)
const findLengthOfLIS = nums => {
  if(!nums.length) return 0
  let currentLength = 1
  let maxLength = 1
  for(let i = 0; i < nums.length; i++){
    if(nums[i] > nums[i - 1]){
      currentLength++
      Math.max(currentLength, maxLength)
    } else {
      currentLength = 1
    }
  }
  return maxLength
}

// Create a class with an undo and redo feature
So this class needs to have two arrays: one to hold the stack to undo (history) and one to pop out the redo tasks (redoStacks)
class UndoRedoManager {
 constructor(){
  this.history = [];
  this.redoStack = [];
 }
 addAction(action){
  this.history.push(action)
  this.redoStack = []
 }
 undo(){
  if(!this.history.length){
    throw new Error('No action to undo')
  }
  const action = this.redoStack.pop()
  this.history.push(action)
  return action
 }
 redo(){
  if(!this.redoStack.length){
    throw new Error('No action to redo')
  }
  const action = this.redoStack.pop()
  this.redoStack.push(action)
  return action
 }
 getHistory(){
  return [...this.history]
 }
 getRedo(){
  return [...this.redoStack]
 }
}

// Extract the keys in this data structure and return them in an array
const ORG_CHART = {
  John: {
    Weston: undefined,
    Jones: {
      Paul: undefined,
    },
  },
  Lou: undefined,
};
const extractKeyNames = data => {
  const names = []
  names.push(...Object.keys(data))
  for(const key in data){
    if(data[key] === 'object' && data[key] !== null){
      names.push(...extractKeyNames(data[key]))
    }
  }
  return names
}

class LRUCache {
  constructor(capacity, ttl){
    this.capacity = capacity;
    this.ttl = ttl;
    this.cache = new Map();
  }
  get(key){
    if(!this.cache.has(key)){
      return -1
    }
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  put(key, value){
    if(this.cache.has(key)){
      this.cache.delete(key)
    } else if(this.cache.size >= this.capacity){
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey)
    }
    this.cache.set(key, value)
  }
}