import { FC } from "react";
import "./App.css";
import { GameInfoProvider, useGameInfo } from "./hooks/useGameInfo";
import Grid from '@mui/material/Grid';
import { GameThemeProvider } from "./components/GameThemeProvider";
import { GameContainer } from "./components/GameContainer";
import { PlayerProvider, useCurrentTurnPlayer } from "./hooks/usePlayer";
import { PhaseChangeProvider } from "./hooks/usePhaseGhange";




const Sample: FC = () => {
  const { addVictoryPoint } = useCurrentTurnPlayer();
  const { switchTurn } = useGameInfo();
  const handleClick = () => {
    addVictoryPoint({ whichTurn: "A" });
  };
  const handleTurn = () => {
    switchTurn()
  }
  return (
    <>
      <button onClick={handleClick}>+1</button>
      <button onClick={handleTurn}>TurnChange</button>
    </>
  );
};

function App() {
  return (
    <GameThemeProvider>
      <GameInfoProvider>
        <PhaseChangeProvider>
          <PlayerProvider>
            <Grid container direction="row" spacing={1} mb={5}>
              <Grid direction="row" xs={12}>
                <Sample />
              </Grid>
            </Grid>
            <GameContainer />
          </PlayerProvider>
        </PhaseChangeProvider>
      </GameInfoProvider>
    </GameThemeProvider>
  );
}

export default App;
