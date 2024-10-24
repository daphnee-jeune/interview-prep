import React, { useState } from "react";

const Input = ({ suggestions }) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);

    // Filter suggestions based on input
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true); // Show the popup when typing
  };

  // Handle clicking a suggestion
  const handleClick = (suggestion) => {
    setInput(suggestion); // Set the input to the clicked suggestion
    setSelectedValue(suggestion); // Store the selected value
    setShowSuggestions(false); // Hide the suggestions popup
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      {/* Render the suggestions dropdown */}
      {showSuggestions && input && (
        <ul style={styles.suggestions}>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleClick(suggestion)}
                style={styles.listItem}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No results found</li>
          )}
        </ul>
      )}

      {/* Display selected result */}
      {selectedValue && <p>Selected: {selectedValue}</p>}
    </div>
  );
};

export default Input;

const styles = {
  suggestions: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "150px",
    overflowY: "auto",
    position: "absolute",
    zIndex: 1,
    width: "200px",
    backgroundColor: "#fff",
  },
  listItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
};
