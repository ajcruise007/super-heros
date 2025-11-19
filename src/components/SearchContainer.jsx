import React from "react";

const SearchContainer = ({
  loading,
  inputText,
  handleInputChange,
  suggestions,
  handleSuggestionClick,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={inputText}
        onChange={(e) => handleInputChange(e)}
        placeholder="Search Superheroes"
      />
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="suggestions">
          {suggestions?.map((suggestion) => {
            return (
              <div
                key={suggestion.id}
                className="suggestion"
                onClick={() => {
                  handleSuggestionClick(suggestion);
                }}
              >
                {suggestion.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
