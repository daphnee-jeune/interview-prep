import React, { useState, useEffect, useCallback } from "react";

const api_url = "https://dummyjson.com/products";

const Test = () => {
  // Store the full list of product titles
  const [allResults, setAllResults] = useState([]);
  // Store the currently displayed (filtered) results
  const [results, setResults] = useState([]);
  // User input from the search box
  const [userInput, setUserInput] = useState("");
  // Client-side cache: keys are search terms, values are the filtered result arrays
  const [cache, setCache] = useState({});
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the full list of products once when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(api_url);
        const data = await response.json();
        const titles = data.products.map(product => product.title);
        setAllResults(titles);
        setResults(titles);
      } catch (err) {
        console.error("Error: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);
  
  // Handle changes in the input field
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    // If the user input exists in our cache, use the cached result
    if (cache.hasOwnProperty(value)) {
      setResults(cache[value]);
      return;
    }

    // Otherwise, filter the full list of titles
    const filteredProducts = allResults.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    // Update the cache with the new search term and its results
    setCache(prevCache => ({ ...prevCache, [value]: filteredProducts }));
    // Update the results state with the filtered products
    setResults(filteredProducts);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search products"
        value={userInput}
        onChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Oops, something went wrong.</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </>
  );
};

export default Test;
