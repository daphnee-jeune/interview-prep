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
    this.events = {}
  }
  subscribe(event, callback){
    if(!this.events[event]) this.events[event] = []
    this.events.push(callback)
  }
  unsubscribe(event, callback){
    if(this.events[event]){
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }
  publish(event, data){
    if(this.events[event]){
      this.events[event].forEach((callback) => callback(data))
    }
  }
}
const pubsub = new PubSub()
const onMessage = data => console.log("New message: ", data)
pubsub.subscribe("message", onMessage)
pubsub.publish("message", "Welcome to Netflix")
pubsub.unsubscribe("message", onMessage)