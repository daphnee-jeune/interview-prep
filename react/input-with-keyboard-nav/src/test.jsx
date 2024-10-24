import React, { useState } from "react";

const url = "https://dummyjson.com/products";

const test = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const fetchResults = async () => {
    const response = await fetch(`${url}/search?q=${query}`);
    const data = await response.json();
    setResults(data.products ?? []);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    setShowDropdown(true);
    if (userInput.trim > 0) {
      fetchResults(userInput);
    } else {
      setResults([]);
    }
  };
  const handleKeydown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prevIndex) => {
        prevIndex > 0 ? prevIndex - 1 : prevIndex;
      });
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        selectItem(results[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };
  const selectItem = (item) => {
    setQuery(item.title);
    setShowDropdown(false);
  };
  const renderDropdown = () => {
    if (!results.length || !showDropdown) return null;
    return (
      <ul>
        {results.map((result, i) => {
          <li
            key={result.id}
            className={highlightIndex === i ? "highlight" : ""}
            onMouseEnter={() => setHighlightIndex(i)}
            onClick={() => selectItem(result)}
          >
            {result.title}
          </li>;
        })}
      </ul>
    );
  };
  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      {renderDropdown()}
    </div>
  );
};

export default test;
