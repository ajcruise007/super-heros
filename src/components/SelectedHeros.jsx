import React from "react";

const SelectedHeros = ({ heros, handleCheckBoxChange, checkedHeros }) => {
  const getValue = (value) => {
    return value === "null" ? "-" : value;
  };
  return (
    <div className="heros-container">
      {heros.map((hero) => {
        const { intelligence, strength, speed, durability, power, combat } =
          hero.powerstats;
        return (
          <div className="hero-card" key={hero.id}>
            <input
              type="checkbox"
              checked={checkedHeros.some(
                (checkedhero) => checkedhero.id === hero.id
              )}
              onChange={(e) => handleCheckBoxChange(e, hero)}
            />
            <h4 className="name">Name: {hero.name}</h4>
            <div className="power">Power: {getValue(power)}</div>
            <div className="intelligence">
              Intelligence: {getValue(intelligence)}
            </div>
            <div className="strength">Strength: {getValue(strength)}</div>
            <div className="speed">Speed: {getValue(speed)}</div>
            <div className="durability">Durability: {getValue(durability)}</div>
            <div className="combat">Combat: {getValue(combat)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedHeros;
