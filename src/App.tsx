import { FC } from "react";
import "./App.css";
import { GameInfoProvider, useGameInfo } from "./hooks/useGameInfo";

import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { GameThemeProvider } from "./components/GameThemeProvider";
import { GameContainer } from "./components/GameContainer";




const Sample: FC = () => {
  const { gameInfo, action } = useGameInfo();
  const handleClick = () => {
    action({ type: "ADD_VICTORY_POINT", payload: { team: "A" } });
  };
  return (
    <>
      <Button>aaaaa</Button>
      <div>victoryPoint: {gameInfo.teams[0].victoryPoint}</div>
      <button onClick={handleClick}>+1</button>
    </>
  );
};

function App() {
  return (
    <GameThemeProvider>
      <GameInfoProvider>
        <Grid container direction="row" spacing={1} mb={5}>
          <Grid direction="row" xs={12}>
            <Sample />
          </Grid>
        </Grid>
        <GameContainer />
      </GameInfoProvider>
    </GameThemeProvider>
  );
}

export default App;
