import React, { useEffect, useState } from "react";
import SelectedHeros from "./SelectedHeros";
import { useNavigate } from "react-router-dom";
import SearchContainer from "./SearchContainer";

const SuperheroSearch = ({
  selectedHeros,
  setSelectedheros,
  checkedHeros,
  setCheckedHeros,
}) => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    const ifSelectedLimitExhausted = selectedHeros.length === 5;
    if (!ifSuggestionPresent && !ifSelectedLimitExhausted) {
      setSelectedheros((prev) => [...prev, selectedSuggestion]);
    }

    setInputText("");
  };
  const handleCheckBoxChange = (e, hero) => {
    if (e.target.checked) {
      setCheckedHeros((prev) => [...prev, hero]);
    } else {
      setCheckedHeros((prev) => prev.filter((prev) => prev.id !== hero.id));
    }
  };

  return (
    <div className="container">
      <SearchContainer
        loading={loading}
        inputText={inputText}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />

      <SelectedHeros
        heros={selectedHeros}
        handleCheckBoxChange={handleCheckBoxChange}
        checkedHeros={checkedHeros}
      />

      {checkedHeros.length > 1 && (
        <button
          onClick={() => {
            navigate("/comparison", { state: { checkedHeros: checkedHeros } });
          }}
        >
          Compare
        </button>
      )}
    </div>
  );
};

export default SuperheroSearch;
