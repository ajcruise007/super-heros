import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Comparison = ({ checkedHeros, setSelectedheros, setCheckedHeros }) => {
  const [hoveredStat, setHoveredStat] = useState(null);

  const heroes = checkedHeros || [];
  const navigate = useNavigate();
  const statNames = useMemo(() => {
    if (heroes.length > 0) {
      return [...Object.keys(heroes[0].powerstats)];
    }

    return [];
  }, [heroes]);

  const bestByStat = useMemo(() => {
    const map = {};
    if (heroes.length === 0) return map;

    for (const stat of statNames) {
      let max = -Infinity;

      heroes.forEach((h) => {
        const val = Number(h.powerstats[stat]);
        if (!isNaN(val)) max = Math.max(max, val);
      });

      const winners = new Set();
      heroes.forEach((h) => {
        const val = Number(h.powerstats[stat]);
        if (val === max) winners.add(h.id);
      });

      map[stat] = winners;
    }

    return map;
  }, [heroes, statNames]);

  const isWinner = (heroId) => {
    if (!hoveredStat) return false;
    return bestByStat[hoveredStat]?.has(heroId);
  };

  const handleFinishComparison = () => {
    setCheckedHeros([]);
    setSelectedheros([]);
    navigate("/", { replace: true });
  };

  const getValue = (value) => {
    return value === "null" ? "-" : value;
  };

  return (
    <div style={{ padding: "20px" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Stat</th>
            {heroes.map((hero) => (
              <th
                key={hero.id}
                className={isWinner(hero.id) ? "highlight" : ""}
              >
                {hero.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {statNames.map((stat) => {
            return (
              <tr
                key={stat}
                onMouseEnter={() => setHoveredStat(stat)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <td>{stat}</td>

                {heroes.map((hero) => {
                  return (
                    <td key={hero.id}>
                      {getValue(hero.powerstats[stat]) ?? "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="finish-button">
        <button onClick={() => handleFinishComparison()}>
          Finish Comparsion
        </button>
      </div>
    </div>
  );
};

export default Comparison;
