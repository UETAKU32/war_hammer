import React, { FC } from "react";
import "./App.css";
import { GameInfoProvider, useGameInfo } from "./hooks/useTeamsInfo";

import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import FighterCard from "./FighterCard";
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes';
import backgroundImage from './/images/background.jpg';




const Sample: FC = () => {
  const { gameInfo, action } = useGameInfo();
  const handleClick = () => {
    action({ type: "ADD_VICTORY_POINT", payload: { team: "A" } });
  };
  return (
    <>
      <Button>aaaaa</Button>
      <div>victoryPoint: {gameInfo.players[0].victoryPoint}</div>
      <button onClick={handleClick}>+1</button>
    </>
  );
};

function App() {

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };


  return (
    <div style={containerStyle}>
      <ThemeProvider theme={theme}>
        <GameInfoProvider>

          <Grid container direction="row" spacing={1}>
            <Grid direction="row" xs={12}>
              <Sample />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1}>
            <Grid direction="column" xs={2}>
              <FighterCard />
              <FighterCard />
              <FighterCard />
            </Grid>
            <Grid direction="column" xs={8}>
              <Box></Box>
            </Grid>
            <Grid direction="column" xs={2} spacing={2}>
              <FighterCard />
              <FighterCard />
              <FighterCard />
            </Grid>
          </Grid>
        </GameInfoProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
