// Longest substr without repeating chars
// Valid parentheses
// Merge intervals
// Meeting rooms
// Product of array except self
// Max depth of binary tree
// Binary tree order traversal
// Search in rotated array
// Find all anagrams in a string
// BFS and DFS

// Build a simple react component
// Sys design of a chat app
// Simple card game
// Given a star widget embedded in a form write the code to select the stars and submit the correct value through a normal form action. Make reusable for multiple star widgets.
// Given an input and an endpoint which returns a JSON list, as a result, extend it to autocomplete on change, handle key navigation through the results
// Build a class that has getter and settings with on change events
// Dealing poker cards, input validation, Water pour
// Given: var thing = new Thing(); How would you implement the following functionality: thing.set('x', val); thing.set('y', val2); console.log(thing.get('x')); // val console.log(thing.get('y')); // val2
function Thing() {
  let list = [];

  this.set = function (key, value) {
    let collection = {
      key: key,
      value: value,
    };

    list.push(collection);
  };

  this.get = function (key) {
    return list.find(function (coll) {
      return coll.key === key;
    }).value;
  };
}
// making your mark and owning your impact.

// Build a clas that acts like a promise
class MyPromise {
  constructor(executor) {
    this.state = "pending"; // initial state
    this.value = undefined; // fulfilled or rejected value
    this.handlers = []; // queue for .then() handlers
    this.catchers = []; // queue for .catch handlers

    // Bind resolve and reject methods to ensure correct 'this'
    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    try {
      executor(resolve, reject); // Execute the passed fn immediately, passing resolve and reject
    } catch (error) {
      reject(error); // If an error occurs during the executor, reject the promise
    }
  }
  // Method to resolve the promise
  resolve(value) {
    if (this.state !== "pending") return; // Prevent state transition after it's settled
    this.state = "fulfilled";
    this.value = value;
    this.handlers.forEach((handler) => handler(value)); // Call all registered .then() handlers
  }
  // Method to reject the promise
  reject(error) {
    if (this.state !== "pending") return; // Prevent state transition after it's settled
    this.state = "rejected";
    this.value = error;
    this.catchers.forEach((catcher) => catcher(error)); // Call all registered .catch() handlers
  }
  // Then method to add a fulfillment handler
  then(onSuccess) {
    return new MyPromise((resolve, reject) => {
      // Push the handler int the handlers array
      const handle = () => {
        if (this.state === "fulfilled") {
          const result = onSuccess(this.value); // If fulfilled, call the success handler and chain the next promise
          resolve(result);
        }
      };

      if (this.state === "pending") {
        this.handlers.push(handle); // If still pending, store the handler
      } else if (this.state === "fulfilled") {
        handle(); // If already fulfilled, call the handler immediately
      }
    });
  }
  catch(onError) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        // if rejected, call the error handler and chain the next promise
        const result = onError(this.value);
        reject(result);
      };

      if (this.state === "pending") {
        this.catchers.push(handle); // If still pending, store the catcher
      } else if (this.state === "rejected") {
        handle(); // If already rejected, call the catcher immediately
      }
    });
  }
  finally(onFinally) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        onFinally(); // Execute the final logic
        if (this.state === "fulfilled") {
          resolve(this.value);
        } else if (this.state === "rejected") {
          reject(this.value);
        }
      };

      if (this.state === "pending") {
        // Store the final logic
        this.handlers.push(handle);
        this.catchers.push(handle);
      } else {
        handle(); // call the final logic immediately if alreaedy settled
      }
    });
  }
}
/* ---------------------------------------------------------------------------------------------- */
// Build a simple promise
const simplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5; // random success or failure
    if (success) {
      resolve("Success!");
    } else {
      reject("Error!");
    }
  }, 500);
});
simplePromise
  .then((result) => {
    console.log(result); // Output: "Success!" (if resolved)
  })
  .catch((error) => {
    console.error(error); // Output: "Error!" (if rejected)
  })
  .finally(() => {
    console.log("Operation complete (either succeeded or failed)"); // Always runs
  });
// Build a simple promise with an added abort() functionality
const simplePromiseWithAbort = (fn) => {
  // fn => the body of the promise and wraps it inside a new Promise
  let isAborted = false;
  let abort;
  const wrappedPromise = new Promise((resolve, reject) => {
    // Abort fn that rejects the promise
    abort = () => {
      if (!isAborted) {
        isAborted = true;
        reject(new Error("Promise aborted"));
      }
    };
    // Execute the provided fn
    fn(
      (value) => {
        if (!isAborted) {
          resolve(value);
        }
      },
      (error) => {
        if (!isAborted) {
          reject(error);
        }
      }
    );
  });
  wrappedPromise.abort = abort;
  return wrappedPromise;
};
// Usage Example
const promise = simplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 2000);
});

// Simulate aborting after 1 second
setTimeout(() => {
  promise.abort();
}, 1000);

// Handle the promise
promise
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error.message));

/* ---------------------------------------------------------------------------------------------- */
// Implement a StoreData class to handle key/value pairs and listen for changes in values.
class StoreData {
  constructor() {
    // the store holds key/value pairs, while listeners manage notifications when values change.
    this.store = {}; // holds the key/value pairs
    this.listeners = {}; // holds arrays of listeners for each keys
  }
  // add or update a value for a specific key
  set(key, value) {
    const oldValue = this.store[key];
    this.store[key] = value;
    // trigger listeners if the value has changed
    if (oldValue !== value) {
      this._notifyListeners(key, oldValue, value);
    }
  }
  // retrieve the value associated with a key
  get(key) {
    return this.store[key];
  }
  // add a listener for a specific key
  addListener(key, listener) {
    if (!this.listeners[key]) {
      this.listeners[key] = []; // initialize array for listeners of this key
    }
    this.listeners[key].push(listener); // add listener to the key's listeners
  }
  // notify all listeners of a key when its value changes
  _notifyListeners(key, oldValue, newValue) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((listener) => {
        listener(oldValue, newValue); // pass the old and new vals to the listener
      });
    }
  }
}
const store = new StoreData();
// Add listeners for changes in specific keys
store.addListener("username", (oldValue, newValue) => {
  console.log(`Username changed from ${oldValue} to ${newValue}`);
});
store.addListener("age", (oldValue, newValue) => {
  console.log(`Age changed from ${oldValue} to ${newValue}`);
});
// Set values for keys
store.set("username", "JohnDoe"); // Username changed from undefined to JohnDoe
store.set("age", 25); // Age changed from undefined to 25
// Modify existing values
store.set("username", "JaneDoe"); // Username changed from JohnDoe to JaneDoe
store.set("age", 30); // Age changed from 25 to 30
// Access stored values
console.log(store.get("username")); // JaneDoe
console.log(store.get("age")); // 30

// Implemebnt a subset of functionality of Backbone.Model class functionality, which allows storing of attributes/values and responding to changes in specific attribute values.
class SimpleModel {
  constructor(attributes = {}) {
    this._attributes = { ...attributes }; // Store attributes
    this._listeners = {}; // Store listeners for changes
  }
  // Method to get the value of an attribute
  get(attr) {
    return this._attributes[attr];
  }
  // Method to set the value of an attribute and trigger change event if needed
  set(attr, value) {
    const oldValue = this._attributes[attr];
    if (oldValue !== value) {
      this._attributes[attr] = value;
      this._triggerChange(attr, value, oldValue); // Trigger any listeners for change
    }
  }
  // Listen for changes on a specific attribute
  onChange(attr, callback) {
    if (!this._listeners[attr]) {
      this._listeners[attr] = [];
    }
    this._listeners[attr].push(callback);
  }
  // Trigger the change event when an attribute changes
  _triggerChange(attr, newValue, oldValue) {
    if (this._listeners[attr]) {
      this._listeners[attr].forEach((callback) => callback(newValue, oldValue));
    }
  }
}
// Example Usage
const myModel = new SimpleModel({ name: "Alice", age: 25 });
// Listening for change events
myModel.onChange("name", (newVal, oldVal) => {
  console.log(`Name changed from ${oldVal} to ${newVal}`);
});
// Getting attributes
console.log(myModel.get("name")); // "Alice"
// Setting attributes
myModel.set("name", "Bob"); // Logs: Name changed from Alice to Bob
myModel.set("age", 26);
console.log(myModel.get("age")); // 26

// Implement a simple FileSystem API. The specific requirements were to implement create(path), get(path), set(path).
class FileSystem {
  constructor() {
    this.root = {}; // Root of the file system
  }
  // Method to create a file or folder at a given path
  create(path) {
    const segments = this._getPathSegments(path);
    let current = this.root;
    // Iterate through the path segments and create folders/files as needed
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      if (!current[segment]) {
        current[segment] = i === segments.length - 1 ? null : {}; // If it's the last segment, assume it's a file, otherwise create a folder
      } else if (
        i === segments.length - 1 &&
        typeof current[segment] === "object"
      ) {
        // If the last segment exists as a folder, throw an error (can't overwrite folder with file)
        throw new Error(
          `Cannot create a file. "${segment}" already exists as a folder.`
        );
      }
      current = current[segment]; // Move deeper into the structure
    }
  }
  // Method to get the value of a file or the structure of a folder at a given path
  get(path) {
    const segments = this._getPathSegments(path);
    let current = this.root;
    for (const segment of segments) {
      if (!current[segment]) {
        throw new Error(`Path not found: ${path}`);
      }
      current = current[segment]; // Traverse the file system
    }
    return current;
  }
  // Method to set a value (content) at a specific file path
  set(path, value) {
    const segments = this._getPathSegments(path);
    let current = this.root;
    // Traverse to the second-to-last segment, ensuring that folders exist
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      if (!current[segment] || typeof current[segment] !== "object") {
        throw new Error(`Invalid path: ${segments.slice(0, i + 1).join("/")}`);
      }
      current = current[segment];
    }
    const file = segments[segments.length - 1];
    if (typeof current[file] === "object") {
      throw new Error(`Cannot set value. "${file}" is a folder.`);
    }
    current[file] = value; // Set the value of the file
  }
  // Private helper method to split the path into segments and remove leading/trailing slashes
  _getPathSegments(path) {
    return path.split("/").filter(Boolean); // Split path by '/' and remove empty segments
  }
}
