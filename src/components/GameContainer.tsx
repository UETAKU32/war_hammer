import { Grid } from "@mui/material";
import { FC } from "react";
import { GameInfoPanel } from "./GameInfoPanel";
import { TeamInfoPanel } from "./TeamInfoPanel";
import Map from "./Map";
import { usePlayersFighter } from "../hooks/usePlayer";
import { useGameInfo } from "../hooks/useGameInfo";
import { defaultMap } from "../data/map";

export const GameContainer: FC = () => {

  const { setWhichWon } = useGameInfo()
  const aliveFightersA = usePlayersFighter("A").filter((fighter) => fighter.coordinate);
  const aliveFightersB = usePlayersFighter("B").filter((fighter) => fighter.coordinate);
  if (aliveFightersB.length < 1) setWhichWon("A");
  if (aliveFightersA.length < 1) setWhichWon("B");

  return (
    <>
      <GameInfoPanel />
      <Grid container direction="row" spacing={1}>
        <Grid direction="column" xs={2}>
          <TeamInfoPanel playerId="A" />
        </Grid>
        <Grid direction="column" xs={8} justifyContent="center" alignItems="center">
          <Map mapInfo={defaultMap} />
        </Grid>
        <Grid direction="column" xs={2}>
          <TeamInfoPanel playerId="B" />
        </Grid>
      </Grid>
    </>
  )
}