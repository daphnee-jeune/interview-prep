import { useState, useCallback } from "react";
import "./App.css";

// Build a search component where:
// 1) Requests fire when you finish typing
// 2) Results may arrive out of order
// 3) This can show wrong results if some requests finish late
// 4) How would you ensure you always get the latest results?
// 5) The The usual solution I see is two approaches
// 6) Cancel previous requests if a new one comes in
// 7) Only show the results of a request that matches the current search text

// Debounce is used to limit the rate at which a function is invoked
const debounce = (fn, delay) => {
  let timer; // store the ID of the timer created by setTimeout. This will be used to track the timeout and clear it if the debounced function is called again within the delay period.
  return (...args) => {
    // returns a new function that will be invoked whenever the debounced function is called.
    clearTimeout(timer); // This clears the previous timer and ensures that fn will not be called until the delay has passed.
    timer = setTimeout(() => fn(...args), delay);
  };
};

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Abort controller for canceling previous requests
  const controller = new AbortController();

  const fetchSearchResults = useCallback(
    async (searchquery) => {
      setIsLoading(true);

      try {
        // cancel previous request
        controller.abort();

        const response = await fetch("https://api.com/something", {
          signal: controller.signal,
        });
        const data = await response.json();

        // Ensure only the latest query's results are shown
        searchquery === input && setResults(data.results);
      } catch (err) {
        if (err.name === "abortError") {
          console.error("req canceled");
        } else {
          setError(`Failed to fetch results: ${err}`);
        }
      }
      setIsLoading(false);
    },
    [input, controller]
  );

  const debouncedSearch = useCallback(
    () => debounce((q) => fetchSearchResults(q), 500),
    []
  );
  const handleChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    debouncedSearch(newInput);
  };
  return (
    <>
      <input
        type="text"
        value={input}
        placeholder="Search"
        onChange={handleChange}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
