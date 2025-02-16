const HistogramBuilder = {
  // Function to build an object that counts occurrences of each item in the list
  buildObjectBySeenCount: function(list) {
    const result = {}; // Initialize an empty object to store counts
    list.forEach(item => {
      // If the item already exists in the object, increment its count
      // If it doesn't exist, initialize it to 0 and then increment
      result[item] = (result[item] || 0) + 1;
    });
    return result; // Return the object containing item counts
  },
  // Function to build and display a histogram based on the given list
  buildHistogram: function(list) {
    // Step 1: Count occurrences of each item in the list
    const data = this.buildObjectBySeenCount(list);
    // Step 2: Select DOM elements where histogram components will be rendered
    const leftAxis = document.querySelector('.left-axis'); // For frequency labels
    const bottomAxis = document.querySelector('.bottom-axis'); // For item labels
    const contentAxis = document.querySelector('.content'); // For histogram bars
    // Step 3: Initialize a Set to keep track of unique frequency values
    const leftAxisValues = new Set();
    // Step 4: Populate the left axis with unique frequency values
    for (const key in data) {
      const val = data[key]; // Frequency of the current item
      if (!leftAxisValues.has(val)) {
        // Add the frequency to the Set if it's not already present
        leftAxisValues.add(val);
        // Create a new DOM element to represent this frequency
        const keyElement = document.createElement('div');
        keyElement.textContent = val; // Set the text content to the frequency value
        leftAxis.appendChild(keyElement); // Append the element to the left axis
      }
    }
    // Step 5: Precompute the maximum frequency for scaling bar heights
    const maxFrequency = Math.max(...Array.from(leftAxisValues));
    // Step 6: Generate bars for the histogram based on the data
    for (const key in data) {
      const val = data[key]; // Frequency of the current item
      // Create a DOM element for the item's label on the bottom axis
      const keyElement = document.createElement('div');
      keyElement.textContent = key; // Set the text content to the item's name
      // Create a DOM element for the bar corresponding to the item's frequency
      const valElement = document.createElement('div');
      // Set the height of the bar proportional to the frequency
      valElement.style.height = ((val / maxFrequency) * 100) + '%';
      // Append the item's label to the bottom axis
      bottomAxis.appendChild(keyElement);
      // Append the bar to the content area of the histogram
      contentAxis.appendChild(valElement);
    }
  }
};

const flatten = value => {
  if(typeof value !== object || value === null) return value // if not an obj or null, return the value

  if(Array.isArray(value)) return flattenAnArray(value) // flatten arr is value is an array
  return flattenAnObj(value) // otherwise, flatten obj
}

function flattenAnArray(input, flattened = []) {
  input.forEach(item => {
    if (Array.isArray(item)) {
      // If item is an array, recursively call flattenArray
      flattenArray(item, flattened);
    } else if (typeof item === 'object' && item !== null) {
      // If item is an object, recursively call flatten on each of its values and concatenate the results
      Object.values(item).forEach(value => {
        flattenArray([value], flattened);  // Wrap value in an array to handle both arrays and single values consistently
      });
    } else {
      // If item is neither an array nor an object, push it directly
      flattened.push(item);
    }
  });
  return flattened;  // Return the flattened array
}

function flattenObject(input) {
  let flattenedObj = {}; // Initialize an empty object for the result
  for (let key in input) { // Iterate over each key in the object
    let value = input[key]; // Get the value for the current key
    let flattenedValue = flatten(value); // Recursively flatten the value

    // If the flattened value is an object, merge it with the result object
    if (typeof flattenedValue === 'object' && flattenedValue !== null && !Array.isArray(flattenedValue)) {
      Object.assign(flattenedObj, flattenedValue);
    } else {
      // If the flattened value is not an object, set it directly on the result object
      flattenedObj[key] = flattenedValue;
    }
  }
  return flattenedObj; // Return the flattened object
}
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
  // loop through the array to check and see if curr is already a prop of acc
  return arr.reduce((acc, curr) => {
    // if curr exists, it increments the count
    if(acc.hasOwnProperty(curr)) (acc[curr] || 0) += 1
    // if curr does not exist, it initializes acc[curr] to 1
    else acc[curr] = 1
    return acc
  }, {})
}
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

const flattenArray = value => {
  let result = []

  if(Array.isArray(value)){
    value.forEach(val => {
      result.push(...flattenArray(val))
    })
  } else {
    result.push(value)
  }
  return result
}
// Write a function to replace placeholders (e.g., {name}, {date}) in a string with values from a given object.
const personalizeTemplate = (template, values) => {
  // values[key] looks up the placeholder key (key) in the values object and if no value is found in the values object for the placeholder, the original match (i.e {name}) is returned, leaving it unchanged.
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] || match)
}
personalizeTemplate('Hello {name}, your appointment is on {date}.', { name: 'Alice', date: 'Jan 15' });
// output: "Hello Alice, your appointment is on Jan 15.

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

// OR
const netflixDebounce = (callback, delay, immediate = false) => {
  let timer = null // initialize timer

  return (...args) => {
    let shouldCallImmediately = !timer && immediate // determines if the function should be called immediately and not already waiting

    if(shouldCallImmediately) callback(...args) // invoke callback if it's to be called immediately and it's the first call 
    if(timer) clearTimeout(timer) // reset timer
    // set new timer that delays the execution of the cb fn
    timer = setTimeout(() => {
      // if not immediate then invoke callback after delay
      if(!immediate) callback(...args)
      // reset timer after callback execution
      timer = null
    }, delay)
  }
}
// Implement a basic throttle function
const basicThrottle = (fn, delay) => {
  let timer = null // keep track of the timer
  return (...args) => {
    if(timer === null){ // if there is no timer currently running
      fn(...args) // execute the main function
      timer = setTimeout(() => { // set a timer to clear the timerFlag after the specified delay
        timer = null // clear the timerFlag to allow the main function to be executed again
      }, delay)
    }
  }
}
// OR
const netflixThrottle = (callback, delay) => {
  let timer // timer used to delay the callback fn execution
  let lastCallTime = 0 // tracks the last time the callback was executed (in ms)
  // throttled version of the callback - handles timing logic and decide whether to execute the callback immediately or after a delay
  const throttler = (...args) => {
    const currentTime = Date.now() // captures the current timestamp
    const timeDifference = currentTime - lastCallTime // time elapsed since the lastCallTime
    const delayRemaining = delay - timeDifference // remaining time before the callback executes
    if(delayRemaining > 0){ // if the prev execution happened too recently
      clearTimeout(timer) // clear any existing timer to ensure no overlapping timeouts
      timer = setTimeout(() => { // set a new timer to execute the callback after delayRemaining runs
        callback(...args) // execute callback
        lastCallTime = Date.now() // update to the current timestamp
      }, delayRemaining)
    } else { // if enough time has passed since the last execution
      callback(...args) // execute the callback with its arguments
      lastCallTime = currentTime // update this value
    }
    throttler.cancel = () => clearTimeout(timer) // adds a cancel method to throttler() to allow the user to clear the current timer by canceling any pending delayed execution of the callback
    return throttler
  }
}
// Implement a throttle function and use it to limit how often a scroll event handler is executed.
const throttle = (fn, delay) => {
  const lastCall = 0
  return (...args) => {
    const now = Date.now()
    if(now - lastCall >= delay){
      lastCall = now
      fn(...args)
    }
  }
}

window.addEventListener("scroll", throttle(() => {
  console.log("Scroll event triggered")
}, 500))

// Build a collapsible/expandable FAQ section using JavaScript
{/* 
<div class="faq">
  <h3 class="question">What is Netflix?</h3>
  <p class="answer">Netflix is a streaming service...</p>
</div>
<div class="faq">
  <h3 class="question">How much does it cost?</h3>
  <p class="answer">The price depends on your plan...</p>
</div> 
*/}

document.querySelectorAll(".question").forEach(question => {
  question.addEventListener("click", () => {
    const currentlyActive = document.querySelector(".faq.active")
    if(currentlyActive && currentlyActive !== question.parentElement){
      currentlyActive.classList.remove('active')
      currentlyActive.querySelector(".answer").style.display = "none"
    }
    const faq = question.parentElement
    const answer = faq.querySelector(".answer")
    const isActive = faq.classList.contains("active")

    if(isActive){
      faq.classList.remove("active")
      answer.style.display = "none"
    } else {
      faq.classList.add("active")
      answer.style.display = "block"
    }
  })
})

// Implement a lightweight publish-subscribe system in JavaScript. It should support:
  // subscribe(event, callback): Register a listener for an event.
  // publish(event, data): Trigger all callbacks for the given event with the provided data.
  // unsubscribe(event, callback): Remove a specific callback for an event.
class PubSub {
  constructor(){
    this.events = {} // acts as a registry, where keys represent event names and values are arrays of callback functions registered for each event.
  }
  subscribe(event, callback){
    if(!this.events[event]) this.events[event] = [] // if the event doesn’t exist in the events registry, it initializes an empty array for that event.
    this.events.push(callback) // adds the given callback to the array of callbacks for the specified event.
  }
  unsubscribe(event, callback){
    if(this.events[event]){ // if the event exists in the events registry: filter out the provided callback from the array of callbacks for that event.
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }
  publish(event, data){
    if(this.events[event]){ // if the event exists in the events registry, loop through all callbacks for that event and invokes them with the provided data.
      this.events[event].forEach((callback) => callback(data))
    }
  }
}

const pubsub = new PubSub()
const onMessage = data => console.log("New message: ", data)
pubsub.subscribe("message", onMessage)
pubsub.publish("message", "Welcome to Netflix")
pubsub.unsubscribe("message", onMessage)

// OTHER VARIATION
class EventEmitter {
  constructor(){
    this.events = {}
  }
  subscribe(eventName, callback){
    if(!this.events[eventName]) this.events[eventName] = []
    this.events[eventName].push(callback)

    const index = this.events[eventName].length
    return {
      release: () => {
        if(this.events[eventName]){
          this.events[eventName].splice(index, 1)
          if(!this.events[eventName]){
            delete this.events[eventName]
          }
        }
      }
    }
  }
  emit(eventName, ...args){
    if(this.events[eventName]){
      this.events[eventName].forEach(cb => cb.apply(this, args))
    }
  }
}
// Write a function that toggles a "Typing..." indicator in the chat when a user starts typing and removes it when they stop typing after 2 seconds.
const setupTypingIndicator = (inputId, indicatorId) => {
  const input = document.getElementById(inputId)
  const indicator = document.getElementById(indicatorId)
  let typingTimeout;
  // listen for user input and toggles a visual indicator dynamically.
  input.addEventListener("input", () => {
    indicator.style.display = "block"
    clearTimeout(typingTimeout)
    // clear the indicator after 2 seconds
    typingTimeout = setTimeout(() => {
      indicator.style.display = "none"
    }, 2000)
  })
}

// Implemenmt a fn that takes an object and returns a deep copy of it
const deepclone = value => {
  if(typeof value !== 'object' || value === null){ // if the value isnt an object or null, return the value
    return value
  }
  let clone = Array.isArray(value) ? [] : {} // variable to hold the cloned values
  // loop through each key
  for(const key in value){
    const val = value[key] // get the value corresponding to each key
    if(typeof val === 'object'){ // check if value is an object
      clone[key] = deepclone(val) // recursively clone the value and assign to the corresponding key
    } else {
      // directly copy the value to the clone
      clone[key] = val
    }
  }
  return clone
}

// OR
const deepCopy = value => {
  if(typeof value !== 'object' || value === null){
    return value
  }

  let clone = Array.isArray(value) ? [] : {}

  for(const key in value){
    const val = value[key]
    clone[key] = deepclone(val)
  }
  return clone
}

// Create a UI where users can dynamically add, edit, and remove input fields for a form.
function createDynamicForm(){
  const form = document.createElement('form')
  const addBtn = document.createElement('button')

  addBtn.textContent = 'Add input'
  addBtn.type = 'button'

  // add new input filed on button click
  addBtn.addEventListener('click', () => {
    const inputWrapper = document.createElement('div')
    const input = document.createElement('input')
    const removeBtn = document.createElement('button')

    input.type = 'text'
    input.placeholder = 'Enter value'

    removeBtn.textContent = 'Remove'
    removeBtn.type = 'button'

    // remove input field on button click
    removeBtn.addEventListener('click', () => {
      form.removeChild(inputWrapper)
    })
    inputWrapper.appendChild(input)
    inputWrapper.appendChild(removeBtn)
    form.appendChild(inputWrapper)
  })
  document.body.appendChild(form)
  document.body.appendChild(addBtn)
}

// write a function to merge two JSON objects representing notification configurations while preserving the structure.
const mergeJson = (config1, config2) => {
  return { ...config1, ...config2 }
}

// Create a rules engine that validates a message configuration based on given rules (e.g., length constraints, required fields).
const message = { title: 'Hi', body: '' }; // `message` to validate
const rules = [
    { 
        field: 'title', 
        validate: (val) => val && val.length > 3, 
        message: 'Title must be longer than 3 characters' 
    },
    { 
        field: 'body', 
        validate: (val) => val, 
        message: 'Body is required' 
    },
];
const validateMessage = (message, rules) => {
  const errors = [] // collect error messages for all failed validations
  for(const rule of rules){ // iterates through each rule in the rules array
    if(!rule.validate(message[rule.field])){ // rule.field specifies the field in the message object to validate (i.e 'title').
      errors.push(rule.message) // add rule.message (the error message) to the errors array
    }
  }
  return errors
}

// Implement a function to limit the number of API calls for sending messages in a given time window.
const rateLimiter = (fn, limit, time) => {
  let calls = 0 // tracks the number of active calls to fn within the given time window
  const queue = [] // holds pending function calls when the rate limit is exceeded

  const processQueue = () => {
    // if there are any queued fns to process AND the number of active calls is less than the allowed limit
    if(queue.length > 0 && calls < limit){
      calls++ // increments the calls counter to indicate that a new function call is being processed
      const next = queue.shift() // removes the 1st function from the queue and stores it in the next variable
      next() // executes the function removed from the queue
      setTimeout(() => calls--, time) // decrements the calls counter after the specified time window has passed and ensures that the rate limiter frees up one slot for another function call after the time delay
    }
  }
  return (...args) => {
    // pushes a wrapper function into the queue. The wrapper calls fn with the correct this context (this) and arguments (args)
    queue.push(() => fn.apply(this, args))
    processQueue()
  }
}

// Given a deeply nested object representing UI module configurations, write a function to transform it into a flat structure for easier processing.
const flattenConfig = (config) => {
  let parentKey = ''
  let result = {}
  for(const key in config){  // iterate over all keys in the config object
    const newKey = parentKey ? `${parentKey}.${key}` : key; // if parentKey is not empty (indicating we're inside a nested object), the new key is formed by appending the current key to the parentKey, separated by a dot and if parentKey is empty (indicating the top level), the new key is just the current key
    if(typeof config[key] === 'object' && !Array.isArray(config[key])){ // determines if the current value is a nested object
      flattenConfig(config[key]) // recursively calls flattenConfig to flatten the nested object
    } else {
      result[newKey] = config[key] // if the current value is not an object it’s added to the result object.
    }
  }
  return result
}

// Example usage
const nestedConfig = {
  ui: {
      button: {
          color: 'red',
          size: 'large'
      },
      text: {
          font: 'Arial',
          weight: 'bold'
      }
  },
  api: {
      endpoint: 'https://example.com',
      timeout: 5000
  }
};

console.log(flattenConfig(nestedConfig));
// Output: {
//   'ui.button.color': 'red',
//   'ui.button.size': 'large',
//   'ui.text.font': 'Arial',
//   'ui.text.weight': 'bold',
//   'api.endpoint': 'https://example.com',
//   'api.timeout': 5000
// }

// Write a function to find and return all the DOM nodes containing specific text (e.g., {placeholder}) in a given DOM tree.
const findNodesWithText = (root, searchText) => {
  const matchingNodes = [] // store nodes that match the search criteria

  // helper function to recursively visit all nodes starting from the root
  const traverse = node => {
    // checks if the current node is a text node AND if the text content of the text node contains the searchText
    if(node.nodeType === Node.TEXT_NODE && node.nodeValue.includes(searchText)){
      matchingNodes.push(node.parentNode) // add Parent Node to Results
    }
    //  recursive - iterates over all current node' child nodes and calls the traverse function on each child
    node.childNodes.forEach(traverse)
  }
  // initiates the traversal by calling traverse on the root node provided as input
  traverse(root)
  return matchingNodes
}
{/* <div id="root">
    <p>Hello World</p>
    <div>
        <span>Placeholder text</span>
        <span>Another World</span>
    </div>
</div> */}
const root = document.getElementById('root');
const result = findNodesWithText(root, 'World');
console.log(result);

// Write a function that resolves dependencies between message modules (e.g., a button requires a URL).
const resolveDependencies = (modules) => {
  const resolved = {}; // stores modules with their resolved dependencies
  const unresolved = new Set(); // tracks modules currently being processed to detect circular dependencies (two or more modules depend on each other creating a loop that prevents proper resolution)

  function resolve(moduleName) {
      if (resolved[moduleName]) {
          return resolved[moduleName]; // return already resolved module
      }
      if (unresolved.has(moduleName)) {
          throw new Error(`Circular dependency detected: ${moduleName}`); // prevent infinite loops
      }
      const module = modules[moduleName]; // fetch the module configuration from the modules object
      if (!module) {
          throw new Error(`Module not found: ${moduleName}`); // handle missing modules
      }
      unresolved.add(moduleName); // mark module as being processed by adding it to the unresolved set
      const dependencies = module.dependencies.map(resolve); // recursively resolve all dependencies
      unresolved.delete(moduleName); // removes the module from the unresolved set, marking it as fully processed
      // adds the resolved module to the resolved object
      resolved[moduleName] = {
          ...module, // copy the original module properties
          resolvedDependencies: dependencies // include the resolved dependencies
      };
      return resolved[moduleName]; // return the resolved module
  }
  for (const moduleName in modules) {
      resolve(moduleName); // ensure all modules are resolved
  }
  return resolved; // return the fully resolved module list
}

// Example usage:
const messageModules = {
  button: {
      dependencies: ['url'],
      render: () => console.log('Button rendered')
  },
  url: {
      dependencies: [],
      render: () => console.log('URL resolved')
  },
  modal: {
      dependencies: ['button', 'url'],
      render: () => console.log('Modal rendered')
  }
};

const resolvedModules = resolveDependencies(messageModules);
console.log(resolvedModules);

// Object manipulation
const person = {
  name: "Alice",
  age: 25,
  city: "Houston",
};

// Iterating through objects
const loopThrough = obj => {
  for(const key in obj){
    console.log(`This key: ${key} has a value of ${obj[key]}`)
  }
}

// Create an object from an array
const entries = [["name", "Alice"], ["age", 25], ["city", "Houston"]];
const personObj1 = Object.fromEntries(entries)
// OR
const personObj2 = entries.reduce((obj, [key, value]) => { // [key, value]: destructures the inner arrays to extract the first (key) and second (value) within them
  obj[key] = value
  return obj
}, {})

// Grouping an Array into an Object
const products = [
  { id: 1, category: "Fruit", name: "Apple" },
  { id: 2, category: "Vegetable", name: "Carrot" },
  { id: 3, category: "Fruit", name: "Banana" },
];

const groupedData = products.reduce((acc, product) => {
  const { category } = product
  if(!acc[category]) acc[category] = []
  acc[category].push(product)
  return acc
}, {})

// {
//   Fruit: [
//     { id: 1, category: "Fruit", name: "Apple" },
//     { id: 3, category: "Fruit", name: "Banana" }
//   ],
//   Vegetable: [
//     { id: 2, category: "Vegetable", name: "Carrot" }
//   ]
// }

// Manipulating the values in an object
const scores = { Alice: 90, Bob: 85, Carol: 95 };
const doubledScores = Object.fromEntries(
  Object.entries(scores).map(([key, value]) => [key, value * 2])
)

// We have two identical DOM trees, A and B. For DOM tree A, we have the location of an element. Create a function to find that same element in tree B
const backWardsPath = (elementInTreeA, rootInTreeB) => {
  const path = [] // store the path indices that describe how to navigate from the root of tree A to the element
  let current = elementInTreeA // will help traverse up the DOM tree to find the path to the root
  // this loop works its way up the tree from the element to the root
  while(current.parentNode){
    // retrieves the index of the current element among its siblings
    const index = [...current.parentNode.children].indexOf(current) // [...current.parentNode.children] converts the HTMLCollection withh all child elements into a regular array
    path.push(index) // records how to navigate from the parent to current when moving down the tree later
    current = current.parentNode // moves current up one level in the tree by assigning it to its parent
  }

  current = rootInTreeB // starting point for the second phase of the function, which navigates down tree B using the path
  while(path.length){
    current = current.children[path.pop()]
  }
  return current
}

// Remove duplicates within a string
const removeDupes = str => {
  const arr = str.split(' ')
  return [...new Set(arr)].join(' ')
}

// You are tasked with creating a function that retrieves information about trending stocks based on their market capitalization and prices. The goal is to identify the top N trending stocks
// where N is a specified number, and return details about these stocks in a structured format. The function should return an array of objects, each encapsulating the symbol, name, market cap
// and current price of these trending stocks
const trendingStocks = async n => {
  const SYMBOLS_API_BASE_URL = 'api_1';
  const MARKET_CAPS_API_BASE_URL = 'api_2';
  const PRICES_API_BASE_URL = 'api_3';
  // fetch symbols and market caps data concurrently to optimize the performance
  const [symbolsResponse, marketCapResponse] = await Promise.all([
    fetch(SYMBOLS_API_BASE_URL),
    fetch(MARKET_CAPS_API_BASE_URL)
  ])
  // parse json data
  const [symbols, marketCaps] = await Promise.all([
    symbolsResponse.json(),
    marketCapResponse.json()
  ])
  // sort stocks by market cap in desc order to identify top N trending stocks
  const rankedSymbolsByMarketCap = marketCaps
    .sort((stockA, stockB) => stockB['market-cap'] - stockA['market-cap'])
    .slice(0, n) // select top N stocks
    .map(marketCapObj => marketCapObj.symbol) // extract symbols of top stocks
  // build the URL for fetching prices by appending the symbols of the top N stocks
  let pricesUrl = PRICES_API_BASE_URL
  pricesUrl += `?symbols=${JSON.stringify(rankedSymbolsByMarketCap)}`
  // fetch price data for selected stocks
  const pricesResponse = await fetch(pricesUrl)
  const pricesJson = await pricesResponse.json()
  // match stocks with their names and market caps
  pricesJson.forEach(obj => {
    // find and assign the name and market cap to each stock obj in the prices array
    let name = symbols.find(item => item['symbol'] === obj['symbol']).name // finds the corresponding symbol object and retrieves its name
    let marketCap = marketCaps.find(item => item['symbol'] === obj['symbol'])['market-cap'] // finds the corresponding market cap object and retrieves its market-cap
    // name and market-cap are added to the obj
    obj.name = name 
    obj['market-cap'] = marketCap
  })
  return pricesJson
}
// Array methods
Array.prototype.myMap = function(callback) {
  const mappedItems = [] // empty arr to store items
  for(let index = 0; index < this.length; index++){
    mappedItems.push(callback(this[index], index, this)) // call the callback function with the current element, index, and the whole array
  }
  return mappedItems
}
Array.prototype.myFilter = function(callback) {
  const filteredItems = []
  for(let i = 0; i < this.length; i++){
    // if the callback function returns true for the current element, add it to filteredItems
    if(callback(this[i], i, this)){
      filteredItems.push(this[i])
    }
  }
  return filteredItems
};
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator =  initialValue === undefined ? this[0] : initialValue // initial the acc
  let startingIndex = initialValue === undefined ? 1 : 0 // determine starting index based on initialValue presence

  for(let index = startingIndex; index < this.length; index++){
     // apply the callback function to each element, accumulating the result
    accumulator = callback(accumulator, this[index], index, this)
  }
  return accumulator
};

// Custom 'this' methods
// Define myCall function on Function prototype
Function.prototype.myCall = function(thisContext = window, ...args) {
  // Fallback to window if no context is provided, or use the provided context
  const context = thisContext || globalThis; // globalThis for a more universal approach
  // Create a unique property on the context object to avoid overwriting an existing property
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // Execute the function with the provided arguments
  const result = context[fnSymbol](...args);
  // Clean up by deleting the temporary function property
  delete context[fnSymbol];
  // Return the result of the function call
  return result;
};
// Define myApply function on Function prototype
Function.prototype.myApply = function(thisContext = window, args = []) {
  // Fallback to window if no context is provided, and default args to an empty array if undefined
  return this.myCall(thisContext, ...args); // Utilize myCall with spread operator for arguments
};
// Define myBind function on Function prototype
Function.prototype.myBind = function(thisContext, ...bindArgs) {
  // Save the original function context and arguments
  const originalFunc = this;
  // Return a new function that captures both initial and subsequent arguments
  return function(...callArgs) {
    // Check if the function is called as a constructor
    if (new.target) {
      // Create a new instance of the original function, passing both sets of arguments
      const instance = new originalFunc(...bindArgs, ...callArgs);
      return instance;
    }
    // If not a constructor call, apply the original function with combined arguments
    return originalFunc.myCall(thisContext, ...bindArgs, ...callArgs);
  };
};

// Example for "add"
const add = (...numbers) => {
  return numbers.reduce((accumulator, num) => accumulator + num);
};

console.log(add(1,2,3,))// 6

// Step 1. Define expect, toBe, equalTo, greaterThan
const expect = (args, value) => {
  return () => {
    const returnedVal = (args).toBe = () => {
      returnedVal === value
    }
  }
}
function expect(x) {
  return {
    toBe: (y) => {
     return x === y
    }
  }
}

const result1 = expect(add(1, 2, 3)).toBe(equalTo(6));
const result2 = expect(add(1, -2)).toBe(equalTo(-1));
const result3 = expect(add(1)).toBe(equalTo(1));
const result4 = expect(add(1, 1)).toBe(equalTo(3));
 
const result5 = expect(10 + 20).toBe(greaterThan(4));
const result6 = expect(4).toBe(greaterThan(5));
 
// should be: true, true, true, false, true, false
console.log(result1, result2, result3, result4, result5, result6);

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
function extractNamesWithFlatMap(data) {
  // Base case: if there are no children, return the current name in an array
  const currentName = [data.name];

  // Use flatMap to flatten the names extracted from children
  const childrenNames = (data.children || []).flatMap(child => extractNamesWithFlatMap(child));

  // Combine the current name with the flattened children names
  return currentName.concat(childrenNames);
}

// Extract all keys from a nested object
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
const extractKeys = data => {
  const topLevelKeys = Object.keys(data)
  const nestedKeys = Object.values(data).filter(el => typeof el === 'object' && el !== null).flatMap(val => extractKeys(val))
  return topLevelKeys.concat(nestedKeys)
}
const otherExtractKeys = data => {
  let keys = []
  for(const key in data){
    keys.push(key)
    if(typeof data[key] === 'object'){
      keys = keys.concat(otherExtractKeys(data[key]))
    }
  }
  return keys
}
// Output: ["name", "age", "details", "address", "city", "zip", "job"]

// https://codesandbox.io/p/sandbox/hopeful-albattani-y2egv

// Sum up all numbers in a nested obj
const values = {
  a: 10,
  b: { "c": { "d": 5 }, "e": 15 },
  f: "non-numeric"
}
const sumNestedNumbers = data => {
  return Object.values(data).reduce((sum, value) => {
    if(typeof value === 'number'){
      return sum + value
    } else if(typeof value === 'object'){
      return sum + sumNestedNumbers(value)
    }
    return sum
  }, 0)
}
const otherSumNestedNumbers = obj => {
  let total = 0
  for(const key in obj){
    if(typeof obj[key] === 'number'){
      total += obj[key]
    } else if(typeof obj[key] === 'object' && obj[key] !== null){
      total += test(obj[key])
    }
  }
  return total
}
// Create a fn to grab the names in this object and return them in a flat array
const dataa = {
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
const getAllNames = obj => {
  const names = []
  if(obj.name){
    names.push(obj.name)
  }
  if(obj.children && Array.isArray(obj.children)){
    obj.children.forEach(child => {
      names = names.concat(getAllNames(child))
    })
  }
  return names
}
// With flatMap
const getAllNamesFlatMap = obj => {
  return [
    obj.name,
    ...(obj.children || []).flatMap(child => getAllNamesFlatMap(child))
  ].filter(Boolean)
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
const extractAllNames = data => {
  const names = []
  for(let key in data){
    if(Array.isArray(data[key])){
      data[key].forEach(item => {
        if(item.name){
          names.push(item.name)
        }
      })
    } else if(typeof data[key] === 'object' && data[key] !== null){
      names = names.concat(extractAllNames(data[key]))
    }
  }
  return names
}

// Define a function excludeItems tasked with filtering an array of items by removing those that meet specific exclusion criteria. This function plays a pivotal role in data processing, enabling the refinement of datasets based on dynamic conditions
// Items: Array of objects with various properties such as color, type, and age
// Excludes: Array of objects Criteria for exclusion as an object containing properties k (the property name to consider for exclusion) and v (the value of that property leading to exclusion)
// Returns a filtered array comprising items that do not align with the specified exclusion criteria.
const items = [
{ color: 'red', type: 'tv', age: 18 },
{ color: 'silver', type: 'phone', age: 20 },
{ color: 'blue', type: 'book', age: 17 }
];

const excludes = [
{ k: 'color', v: 'blue' },
{ k: 'type', v: 'phone' }
];

[{ color: 'red', type: 'tv', age: 18 }]

const excludeItems = (items, excludes) => {
  return items.reduce((result, item) => {
    const shouldExclude = excludes.some(exclude => item[exclude.k] === exclude.v)
    if(!shouldExclude) result.push(item)
    return result
  }, [])
}
// OR
const otherExcludeItems = (items, excludes) => {
  return items.filter(item => {
    return !excludes.some(exclude => item[exclude.k] === exclude.v)
  })
}

// Given a dataset (array of objects) and the match object, write a function that produces an array containing only the objects that satisfy all the criteria in the match object
const params = [
  { name: 'John', company: 'Google', position: 'Software Engineer', level: 'Entry' },
  { name: 'Ann', company: 'Waymo', position: 'Product Manager', level: 'Entry' }
]
const match = { position: 'Product Manager', level: 'Entry' }
// Output
[
  { name: 'Ann', company: 'Waymo', position: 'Product Manager', level: 'Entry' }
]
const findMatches = (data, match) => {
  return data.filter(item => {
    return Object.entries(match).every(([key, value]) => item[key] === value)
  })
}

// Given a nested folder structure as an object, write a function that recursively retrieves all file paths while ignoring empty directories
// Example input
const folderStructure = {
  src: {
    components: {
    Button: {
      "index.js": "file",
      "style.css": "file"
      }
    },
    utils: {
      "helpers.js": "file"
    }
  },
  public: {
    "index.html": "file"
  }
 };
// Expected Output:
[
 "src/components/Button/index.js",
 "src/components/Button/style.css",
 "src/utils/helpers.js",
 "public/index.html"
]
const returnPaths = structure => {
  const result = []
  
  function traverse(currentPath, currentObject){
    for(const key in currentObject){
      if(currentObject[key] === 'file'){
        result.push(currentPath + key)
      } else {
        if(Object.keys(currentObject[key].length > 0)){
          traverse(currentPath + key + '/', currentObject[key])
        }
      }
    }
  }
  traverse('', structure)
  return result
}

// Given a nested object, write a function that flattens it into a single-level object with dot-separated keys
// Input
const nestedObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
    },
  },
  g: 5,
};
// Output
const output = {
  "a": 1',
  "b.c": 2,
  "b.d.e": 3,
  "b.d.f": 4,
  "g": 5,
}
const flattenObj = nestedObj => {
  const flattened = {}

  function traverse(currentKey, currentObj){
    for(const key in currentObj){
      const newKey = currentKey ? `${currentKey}.${key}` : key
      if(typeof currentObj[key] === 'object' && currentObj[key] !== null){
        traverse(newKey, currentObj[key])
      }
    }
  }
  traverse('', nestedObj)
  return flattened
}