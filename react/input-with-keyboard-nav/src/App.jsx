import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState(""); // Stores the user input
  const [results, setResults] = useState([]); // Stores the API search results
  const [highlightIndex, setHighlightIndex] = useState(-1); // Track which result is highlighted
  const [showDropdown, setShowDropdown] = useState(false); // Controls visibility of dropdown

  // Function to fetch data from the API
  const fetchProducts = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    const data = await response.json();
    setResults(data.products || []);
  };

  // Handle input change (Autocomplete logic)
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    if (value.trim().length > 0) {
      fetchProducts(value);
    } else {
      setResults([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move the highlight down
      setHighlightIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Move the highlight up
      setHighlightIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      // Select the highlighted item
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        selectItem(results[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      // Close the dropdown
      setShowDropdown(false);
    }
  };

  // Handle item selection (triggered by clicking or pressing Enter)
  const selectItem = (item) => {
    setQuery(item.title); // Set the query to the selected item
    setShowDropdown(false); // Hide the dropdown
  };

  // Render the autocomplete dropdown list
  const renderDropdown = () => {
    if (!showDropdown || results.length === 0) {
      return null;
    }

    return (
      <ul className="autocomplete-dropdown">
        {results.map((result, index) => (
          <li
            key={result.id}
            className={highlightIndex === index ? "highlight" : ""}
            onMouseEnter={() => setHighlightIndex(index)} // Highlight on hover
            onClick={() => selectItem(result)} // Select on click
          >
            {result.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a product..."
      />
      {renderDropdown()}
    </div>
  );
};

export default App;
