// Write a function that returns a map of the totaled occurrences of elements within an array.
const totalOccurencesMap = (arr) => {
  const occurrences = new Map();

  for (const element of arr) {
    occurrences.set(element, (occurrences.get(element) || 0) + 1);
  }

  return occurrences;
};
const totalOccurences = arr => {
  if(!Array.isArray(arr)) throw new Error('Not an array')
    return arr.reduce((acc, curr) => {
      if(acc.hasOwnProperty(curr)) acc[curr] += 1
      else acc[curr]
      return acc
    }, {})
}

const test = arr => {
  if(!Array.isArray(arr)) throw new Error('oops')
  return arr.reduce((acc, curr) => {
    if(acc.hasOwnProperty(curr)) (acc[curr] || 0) += 1
    else acc[curr]
    return acc
  }, {})
}
