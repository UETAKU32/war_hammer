import { Grid } from "@mui/material";
import { FC } from "react";
import { FighterCard } from "./FighterCard";
import { TeamName, useGameInfo } from "../hooks/useGameInfo";

type TeamInfoPanelProps = {
  teamName: TeamName;
}

export const TeamInfoPanel: FC<TeamInfoPanelProps> = ({ teamName }) => {
  const { gameInfo } = useGameInfo();
  const team = gameInfo.teams.find((player) => player.name === teamName)
  if (!team) throw new Error(`Team ${teamName} was not found.`)
  return (
    <Grid direction="column" xs={2}>
      {team.fighters.map((fighter) => <FighterCard teamName={teamName} fighter={fighter} />)}
    </Grid>
  )
}