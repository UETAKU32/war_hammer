import { Grid } from "@mui/material";
import { FC } from "react";
import { useGameInfo } from "../hooks/useGameInfo";
import { GameInfoPanel } from "./GameInfoPanel";
import { TeamInfoPanel } from "./TeamInfoPanel";
import HoneyComb from "./HoneyComb";

export const GameContainer: FC = () => {
  useGameInfo();
  return (
    <>
      <GameInfoPanel />
      <Grid container direction="row" spacing={1}>
        <TeamInfoPanel teamName="A" />
        <Grid direction="column" xs={8}>
          <HoneyComb />
        </Grid>
        <TeamInfoPanel teamName="B" />
      </Grid>
    </>)
}