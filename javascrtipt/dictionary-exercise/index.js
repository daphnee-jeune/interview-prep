// input: 'cat, 'car', 'bar'
// function setup(input) consumes dictionary and remembers it in some format
// function isInDict(word) returns true if word is a dictionary
// setup(['cat', 'car', 'bar])
// isInDict('cat') => true
// isInDict('car') => true
// isInDict('top') => false
// isInDict('*at') => true
// isInDict('cr*') => false

// This code defines a Dictionary class that stores words and checks if a word (with or without wildcards) exists in the dictionary
class Dictionary {
  constructor(wordsArr) {
    const wordMap = wordsArr.reduce((acc, word) => { // creates an object with the keys and values being the words in the dictionary
      acc[word] = word; // use the words in the array as both the keys and values in the object
      return acc; // acc is the obj
    }, {});
    this.dict = wordMap; // assigns the wordMap obj to this.dict
  }
  isInDict(word) {
    if (this.dict[word] !== undefined) return true; // O(1). checks if the full word, no wildcards exists in dictionary
    if (!word.includes("*")) return false; // returns False if No Wildcards and Word Not in Dictionary
    // If the word contains a wildcard (*)
    return Object.values(this.dict).some((dictWord) => { // gets an array of all the words stored in the dictionary and checks if any word in the dictionary matches the pattern
      // O(n) iterate through every word in the arr
      const regexTemplate = word.replaceAll("*", "."); // This line replaces all instances of the wildcard '*' in the word with '.' (any in regex)
      const regex = new RexExp(`^${regexTemplate}$`); // This creates a regex using the template to ensure the regex matches the entire word.
      return regex.test(dictWord); // Test each word against the regex
    });
  }
}

const test = new Dictionary(["cat", "car", "bar"]);
console.log(test.isInDict("cat")); // true
console.log(test.isInDict("lol")); // false

// Optimized version
class Dictionary {
  constructor(wordsArr) {
    const wordMap = wordsArr.reduce((acc, word) => {
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
    return !!this.dict[word];
  }
}
