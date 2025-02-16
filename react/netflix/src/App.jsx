import React, { useState, useCallback } from "react";

function executeSearch(term) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([term, `${term} foo, ${term} bar`]);
    }, Math.floor(Math.random() * 3000));
  });
}

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) return;
      if (cache[term]) {
        setResults(cache[term]);
        return;
      }

      try {
        setIsLoding(true);
        setError(null);
        const searchResults = await executeSearch(term);
        setCache((prevCache) => ({
          ...prevCache,
          [term]: searchResults,
        }));
        setResults(searchResults);
      } catch (err) {
        setError("Failed to fetch results. Please try again");
      } finally {
        setIsLoding(false);
      }
    }, 300)[cache]
  );
  return (
    <div>
      <input
        type="text"
        value={userInput}
        placeholder="Search..."
        onChange={handleChange}
      />
      {isLoading && "Loading..."}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((result, i) => {
          <li key={i}>{result}</li>;
        })}
      </ul>
    </div>
  );
};

const debounce = (fn, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
export default App;
