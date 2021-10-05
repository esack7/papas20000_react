import { useContext } from "react";
import { PageVisContext } from "../context/PageVisContext";
import "../style.css";

export const StartGame = () => {
  const { dispatch } = useContext(PageVisContext);
  return (
    <div className="StartGame">
      <h1>Papa's 20,000</h1>
      <h2>Dice Tracker</h2>
      <button onClick={() => dispatch({ type: "AddUsers" })}>Start Game</button>
    </div>
  );
};
