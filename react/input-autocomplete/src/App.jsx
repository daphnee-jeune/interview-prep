import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Function to fetch suggestions from an API endpoint based on input
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`/api/suggestions?query=${query}`);
      const data = await response.json();
      setSuggestions(data); // Set fetched suggestions
      setShowSuggestions(true); // Show suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input changes and fetch suggestions
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    if (userInput) {
      fetchSuggestions(userInput);
    } else {
      setShowSuggestions(false); // Hide suggestions if input is cleared
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Navigate down the list
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      // Navigate up the list
      setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      // Select the active suggestion
      if (activeSuggestionIndex >= 0) {
        setInputValue(suggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false); // Close the suggestions when pressing Escape
    }
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false); // Close the suggestion box
  };

  return (
    <div className="App">
      <h1>Autocomplete Input</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Start typing..."
      />
      {showSuggestions && inputValue && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={
                index === activeSuggestionIndex ? "suggestion-active" : ""
              }
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
