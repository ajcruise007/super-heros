import React, { useEffect, useState } from "react";
import SelectedHeros from "./SelectedHeros";

const SuperheroSearch = () => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHeros, setSelectedheros] = useState([]);
  const [checkedHeros, setCheckedhHeros] = useState([]);
  useEffect(() => {
    if (inputText.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.superheroapi.com/api/cb25e303512c5442208419f96bd70d1a/search/${inputText}`,
          { signal: signal }
        );
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    let timer;

    timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSuggestionClick = (selectedSuggestion) => {
    const ifSuggestionPresent = selectedHeros.some(
      (suggestion) => suggestion.id === selectedSuggestion.id
    );
    if (!ifSuggestionPresent) {
      setSelectedheros((prev) => [...prev, selectedSuggestion]);
    }

    setInputText("");
  };
  const handleCheckBoxChange = (e, hero) => {
    if (e.target.checked) {
      setCheckedhHeros((prev) => [...prev, hero]);
    } else {
      setCheckedhHeros((prev) => prev.filter((prev) => prev.id !== hero.id));
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={inputText}
          onChange={(e) => handleInputChange(e)}
          placeholder="Search Superheroes"
        />
      </div>
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
      <SelectedHeros
        heros={selectedHeros}
        handleCheckBoxChange={handleCheckBoxChange}
      />
    </div>
  );
};

export default SuperheroSearch;
