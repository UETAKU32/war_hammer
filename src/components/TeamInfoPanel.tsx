import { FC } from "react";
import { FighterCard } from "./FighterCard";
import { TeamName, useGameInfo } from "../hooks/useGameInfo";

type TeamInfoPanelProps = {
  teamName: TeamName;
}

export const TeamInfoPanel: FC<TeamInfoPanelProps> = ({ teamName }) => {
  const { gameInfo } = useGameInfo();
  const team = gameInfo.teams.find((player) => player.name === teamName)
  console.log({ teamName, team })
  if (!team) throw new Error(`Team ${teamName} was not found.`)
  return (
    <>
      {team.fighters.map((fighter) => <FighterCard key={`${fighter.id}`} teamName={teamName} fighter={fighter} />)}
    </>
  )
}