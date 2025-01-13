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
  // if the value isnt an object or null, return the value
  if(typeof value !== 'object' || value === null){
    return value
  }
  // variable to hold the cloned values
  let clone = Array.isArray(value) ? [] : {}

  // loop through each key
  for(const key in value){
    // get the value corresponding to each key
    const val = value[key]
    // check if value is an object
    if(typeof val === 'object'){
      // recursively clone the value and assign to the corresponding key
      clone[key] = deepclone(val)
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

// Write a function to replace placeholders (e.g., {name}, {date}) in a string with values from a given object.
const personalizeTemplate = (template, values) => {
  // values[key] looks up the placeholder key (key) in the values object and if no value is found in the values object for the placeholder, the original match (i.e {name}) is returned, leaving it unchanged.
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] || match)
}
personalizeTemplate('Hello {name}, your appointment is on {date}.', { name: 'Alice', date: 'Jan 15' });
// output: "Hello Alice, your appointment is on Jan 15.

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