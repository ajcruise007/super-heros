import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Comparison = ({ checkedHeros, setSelectedheros, setCheckedHeros }) => {
  const heroes = checkedHeros || [];
  const navigate = useNavigate();
  const statNames = useMemo(() => {
    if (heroes.length > 0) {
     return [...Object.keys(heroes[0].powerstats)];
    }

    return [];
  }, [heroes]);

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
              <th key={hero.id}>{hero.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {statNames.map((stat) => {
            return (
              <tr key={stat}>
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
