import React from "react";

const SelectedHeros = ({ heros, handleCheckBoxChange }) => {
  return (
    <div className="heros-container">
      {heros.map((hero) => {
        const { intelligence, strength, speed, durability, power, combat } =
          hero.powerstats;
        return (
          <div className="hero-card">
            <input type="checkbox" onChange={(e) => handleCheckBoxChange(e, hero)}/>
            <div className="name">{hero.name}</div>
            <div className="intelligence">{intelligence}</div>
            <div className="strength">{strength}</div>
            <div className="speed">{speed}</div>
            <div className="durability">{durability}</div>
            <div className="power">{power}</div>
            <div className="combat">{combat}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedHeros;
