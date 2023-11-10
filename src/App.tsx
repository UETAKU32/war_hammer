import React, { FC } from "react";
import "./App.css";
import { PlayerInfoProvider, usePlayerInfo } from "./hooks/useTeamsInfo";

const Sample: FC = () => {
  const { gameInfo, action } = usePlayerInfo();
  const handleClick = () => {
    action({ type: "ADD_VICTORY_POINT", payload: { team: "A" } });
  };
  return (
    <>
      <div>victoryPoint: {gameInfo.players[0].victoryPoint}</div>
      <button onClick={handleClick}>+1</button>
    </>
  );
};

function App() {
  return (
    <PlayerInfoProvider>
      <Sample />
    </PlayerInfoProvider>
  );
}

export default App;
