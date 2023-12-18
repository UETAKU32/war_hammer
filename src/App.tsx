import { FC } from "react";
import "./App.css";
import { GameInfoProvider } from "./hooks/useGameInfo";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { GameThemeProvider } from "./components/GameThemeProvider";
import { GameContainer } from "./components/GameContainer";
import { PlayerProvider, useCurrentTurnPlayer } from "./hooks/usePlayer";




const Sample: FC = () => {
  const { player, action } = useCurrentTurnPlayer();
  const handleClick = () => {
    action({ type: "ADD_VICTORY_POINT", payload: { whichTurn: "A" } });
  };
  return (
    <>
      <Button>aaaaa</Button>
      <div>victoryPoint: {player.victoryPoint}</div>
      <button onClick={handleClick}>+1</button>
    </>
  );
};

function App() {
  return (
    <GameThemeProvider>
      <GameInfoProvider>
        <PlayerProvider>
          <Grid container direction="row" spacing={1} mb={5}>
            <Grid direction="row" xs={12}>
              <Sample />
            </Grid>
          </Grid>
          <GameContainer />
        </PlayerProvider>
      </GameInfoProvider>
    </GameThemeProvider>
  );
}

export default App;
