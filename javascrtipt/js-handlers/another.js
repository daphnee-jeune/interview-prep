// Debounce
function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.apply(this, args);
    }, delay);
  };
}

const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = obj[key];
    if (typeof obj[key] === "object" && obj[key] !== null) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
};

const flattenArr = (arr) => {
  const result = [];
  if (!arr.length) {
    return null;
  }
  arr.forEach((el) => {
    if (Array.isArray(el)) {
      result.push(...flattenArr(el));
    } else {
      result.push(el);
    }
  });
  return result;
};

const lengthOfLongestSubstr = (str) => {
  if (!str.length) return null;
  const maxLength = 0;
  let current = "";
  for (let char of str) {
    if (current.includes(char)) {
      current = current.slice(current.indexOf(char) + 1);
    }
    current += char;
    maxLength = Math.max(maxLength, current.length);
  }
  return maxLength;
};

const groupAnagrams = (words) => {
  const groups = {};
  for (const word in words) {
    const sorted = word.split("").sort().join("");
    if (!groups[sorted]) {
      groups[sorted] = [];
    }
    groups[sorted].push(word);
  }
  return Object.values(groups);
};

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}

class EventEmitter {
  constructor() {
    this.events = {};
  }
  subscribe(eventName, cb) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(cb);
    const index = this.events[eventName].length;
    return {
      release: () => {
        if (this.events[eventName]) {
          this.events[eventName].splice(index, 1);
          if (!this.events[eventName]) {
            delete this.events[eventName];
          }
        }
      },
    };
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => cb.apply(this, args));
    }
  }
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]);
    }
    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((value) => {
          results[idx] = value;
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

// Return the temperatures of this data structure in an array
const mockWeatherData = {
  "New York": { temperature: "22°C", humidity: "56%", windSpeed: "15 km/h" },
  "Los Angeles": { temperature: "27°C", humidity: "45%", windSpeed: "10 km/h" },
  "London": { temperature: "15°C", humidity: "70%", windSpeed: "20 km/h" },
};
const grabTemperatures = (data) => {
  if (typeof data !== "object" || data === null) return;
  const temps = [];
  for (const key in data) {
    temps.push(data[key].temperature);
  }
  return temps;
};
const otherGrab = (data) => {
  if (typeof data !== "object" || data === null) return;
  return Object.values(data).map((city) => city.temperature);
};

const weatherData = [
  {
    id: 0,
    city: "New York",
    current: {
      temp: 72,
      condition: "Sunny",
      icon: "sun",
      wind: 5,
      humidity: 45,
      visibility: 10,
    },
    forecast: [
      { day: "Mon", temp: 75, condition: "Sunny", icon: "sun" },
      { day: "Tue", temp: 78, condition: "Partly Cloudy", icon: "cloud" },
      { day: "Wed", temp: 68, condition: "Rain", icon: "rain" },
      { day: "Thu", temp: 65, condition: "Rain", icon: "rain" },
      { day: "Fri", temp: 70, condition: "Cloudy", icon: "cloud" },
    ],
  },
];

// Return a new object with the city as a key and the forecast array as the value
const restructureObj = (data) => {
  if (!Array.isArray(data) || data === null) return;
  return data.reduce((acc, curr) => {
    acc[curr].city = acc[curr].forecast;
    return acc;
  }, {});
};

const list = [
  { name: "Apple", category: "Fruit" },
  { name: "Cucumber", category: "Vegetable" },
  { name: "Banana", category: "Fruit" },
];
// Return an an object with the cateogry as key and an array of fruits as the value
const changeDataStructure = (data) => {
  if (!Array.isArray(data) || data === null) return;
  return data.reduce((acc, curr) => {
    const { name, category } = curr;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(name);
    return acc;
  });
};

const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
// Return an object with the occurences of each fruit
const fruitCount = (fruits) => {
  return fruits.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

// "racecar"
const checkPalindrome = (str) => {
  return str === str.split("").reverse().join("");
};

const countVowels = (str) => {
  const vowels = "aeiou";
  return str
    .toLowerCase()
    .split("")
    .filter((letter) => vowels.includes(letter)).length;
};

const removeDupes = (str) => {
  return [...new Set(str)].join("");
};