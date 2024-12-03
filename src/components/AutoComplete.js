import React, { useState } from "react";
const AutoCompleteSearch = () => {
  const suggestions = [
    "Apple",
    "Banana",
    "Blueberry",
    "Blackberry",
    "Cherry",
    "Date",
    "Grapes",
    "Lemon",
    "Mango",
    "Orange",
    "Pineapple",
    "Strawberry",
    "Watermelon",
  ];
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    if (query) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const handleSuggestionSelect = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };
  const handleBlur = (e) => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };
  const handleClickInside = (e) => {
    e.stopPropagation();
  };
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search fruits"
      />
      {showSuggestions && inputValue && (
        <ul
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            marginTop: "5px",
            position: "absolute",
            width: "100%",
            backgroundColor: "white",
            zIndex: "10",
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionSelect(suggestion)}
              onMouseDown={handleClickInside}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: "#f4f4f4",
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default AutoCompleteSearch;
