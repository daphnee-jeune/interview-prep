import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState(""); // Stores the user input
  const [results, setResults] = useState([]); // Stores the API search results as an array
  const [isLoading, setIsLoading] = useState(false); // Boolean to track loading state
  const [highlightIndex, setHighlightIndex] = useState(-1); // Track which result is highlighted
  const [showDropdown, setShowDropdown] = useState(false); // Controls visibility of dropdown
  const [error, setError] = useState(null); // Stores error message

  // Function to fetch data from the API
  const fetchProducts = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    const data = await response.json();
    return data.products || []; // Return the products array
  };

  // Handle input change (Autocomplete logic)
  const handleChange = async (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    setShowDropdown(true);

    if (userInput.trim().length === 0) {
      setResults([]); // Clear results if input is empty
      return;
    }

    try {
      setIsLoading(true);
      setError(null); // Clear previous errors

      const awaitedResults = await fetchProducts(userInput);
      setResults(awaitedResults); // Update results with the fetched data

      setIsLoading(false);
    } catch (err) {
      setError("Error fetching data.");
      setIsLoading(false);
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
    setQuery(item.title); // Set the query to the selected item's title
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
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div>{renderDropdown()}</div>
    </div>
  );
};

export default App;
