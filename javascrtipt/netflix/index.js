// Write a function that returns a map of the totaled occurrences of elements within an array
const totalOccurencesMap = (arr) => {
  const occurrences = new Map(); // initialization: create a new Map called occurrences
  // iteration: loop through each element in the array using a for...of loop
  for (const element of arr) {
    // counting: if the element already exists in the map, increment its value. Otherwise, initialize its value to 1
    occurrences.set(element, (occurrences.get(element) || 0) + 1);
  }
  // return the map: after the loop, the map contains each element and its total occurrences
  return occurrences;
};

const totalOccurrences = arr => {
  // input validation: throw an error is the array is empty or not an array
  if(!Array.isArray(arr)) throw new Error('oops')
  // loop through the array to check an dsee if curr is already a prop of acc
  return arr.reduce((acc, curr) => {
    // if curr exists, it increments the count
    if(acc.hasOwnProperty(curr)) (acc[curr] || 0) += 1
    // if curr does not exist, it initializes acc[curr] to 1
    else acc[curr] = 1
    return acc
  }, {})
}

// Implement a function to debounce a user input
const debounce = (cb, delay) => {
  let timer
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(this, args)
    }, delay)
  }
}
const handleSearch = debounce((query) => {
  console.log("Searching for:", query)
}, 300)
document.getElementById('searchInput').addEventListener("input", (e) => handleSearch(e.target.value))
