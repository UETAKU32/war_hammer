import { Grid } from "@mui/material";
import { FC } from "react";
import { GameInfoPanel } from "./GameInfoPanel";
import { TeamInfoPanel } from "./TeamInfoPanel";
import HoneyComb from "./HoneyComb";

export const GameContainer: FC = () => {
  return (
    <>
      <GameInfoPanel />
      <Grid container direction="row" spacing={1}>
        <Grid direction="column" xs={2}>
          <TeamInfoPanel playerId="A" />
        </Grid>
        <Grid direction="column" xs={8} justifyContent="center" alignItems="center">
          <HoneyComb />
        </Grid>
        <Grid direction="column" xs={2}>
          <TeamInfoPanel playerId="B" />
        </Grid>
      </Grid>
    </>
  )
}