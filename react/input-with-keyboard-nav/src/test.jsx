import React, { useState } from "react";

const api_endpoint = "https://dummyjson.com/products/";

const test = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(-1);

  const fetchResults = async () => {
    const response = await fetch(`${api_endpoint}/search?q=${query}`);
    const data = await response.json();
    return data.products ?? []; // Return the products array
  };

  const handleInputChange = async (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    setShowDropdown(true);

    try {
      setIsLoading(true);
      setError(null);
      const awaitedResults = await fetchResults(userInput);
      setResults(awaitedResults);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key = "ArrowDown")) {
      setCurrentIdx((prevIdx) => {
        prevIdx < results.length - 1 ? prevIdx + 1 : prevIdx;
      });
    } else if (e.key === "ArrowUp") {
      setCurrentIdx((prevIdx) => {
        prevIdx > 0 ? prevIdx - 1 : prevIdx;
      });
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    } else if (e.key === "Enter") {
      if (currentIdx >= 0 && currentIdx < results.length) {
        selectItem(results[currentIdx]);
      }
    }
  };
  const selectItem = (item) => {
    setQuery(item.title);
    setShowDropdown(false);
  };
  const renderDropdown = () => {
    return (
      <ul>
        {results.map((result, i) => {
          return (
            <li
              key={result.id}
              onClick={() => selectItem(result)}
              onMouseEnter={() => setCurrentIdx(i)}
              className={currentIdx === i ? "highlight" : ""}
            >
              {result.title}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {renderDropdown()}
      </div>
    </div>
  );
};

export default test;
