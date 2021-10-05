import React from "react";
import "../style.css";

export const AddUsers = () => {
  return (
    <div className="AddUsers">
      <h2>Add Players</h2>
      <p>* You must add at least 1 player to start the game</p>
      <input
        type="text"
        name="playername"
        id="playername"
        placeholder="Add Player Name"
      />
      <button id="addplayer">Add Player</button>
      <button>Start Game</button>
      <h4>Players added:</h4>
      <ol id="listOfPlayers"></ol>
    </div>
  );
};
