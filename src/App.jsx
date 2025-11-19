import { useState } from "react";
import "./App.css";
import Comparison from "./components/Comparison";
import SuperheroSearch from "./components/SuperheroSearch";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [selectedHeros, setSelectedheros] = useState([]);
  const [checkedHeros, setCheckedHeros] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SuperheroSearch
              selectedHeros={selectedHeros}
              setSelectedheros={setSelectedheros}
              checkedHeros={checkedHeros}
              setCheckedHeros={setCheckedHeros}
            />
          }
        />
        <Route
          path="/comparison"
          element={<Comparison checkedHeros={checkedHeros}  setSelectedheros={setSelectedheros}   setCheckedHeros={setCheckedHeros}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
