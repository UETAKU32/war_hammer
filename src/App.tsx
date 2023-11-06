import React, { FC } from "react";
import "./App.css";
import {
  PlayerInfo,
  PlayerInfoProvider,
  usePlayerInfo,
} from "./hooks/useTeamsInfo";

const Sample: FC = () => {
  const { player, updatePlayer } = usePlayerInfo();
  const handleClick = () => {
    const newPlayerInfo: PlayerInfo = {
      ...player,
      victoryPoint: player.victoryPoint + 1,
    };
    updatePlayer(newPlayerInfo);
  };
  return (
    <>
      <div>victoryPoint: {player.victoryPoint}</div>
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
