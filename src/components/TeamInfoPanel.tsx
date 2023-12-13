import { FC } from "react";
import { FighterCard } from "./FighterCard";
import { PlayerId } from "../types/Player";
import { usePlayer } from "../hooks/usePlayer";

type TeamInfoPanelProps = {
  playerId: PlayerId;
}

export const TeamInfoPanel: FC<TeamInfoPanelProps> = ({ playerId }) => {
  const { player } = usePlayer(playerId)
  if (!player) throw new Error(`Team ${playerId} was not found.`)
  return (
    <>
      {player.fighters.map((fighter) => <FighterCard key={`${fighter.id}`} teamName={playerId} fighter={fighter} />)}
    </>
  )
}