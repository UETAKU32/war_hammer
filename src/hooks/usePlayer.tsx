import { produce } from "immer";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Fighter } from "../types/fighter";
import { Player, PlayerId } from "../types/Player";
import { player1, player2 } from "../data/initialPlayers";

const PlayerContext = createContext<PlayerProviderProps | null>(null);

type PlayerAction =
  | { type: "ATTACK"; payload: { attacker: Fighter; receiver: Fighter } }
  | { type: "HEAL"; payload: { healHP: number; receiver: Fighter } }
  | { type: "ADD_VICTORY_POINT"; payload: { team: PlayerId } };

const reducer = produce((players: Player[], action: PlayerAction) => {
  switch (action.type) {
    case "ATTACK":
      break;
    case "HEAL":
      break;
    case "ADD_VICTORY_POINT":
      const selectedTeam = action.payload.team;
      const updatedTeam = players.find(
        (player) => player.name === selectedTeam
      );
      if (!updatedTeam) throw new Error(`Team${selectedTeam} was not found.`);
      updatedTeam.victoryPoint++;
      break;
    default:
      break;
  }
});

type PlayerProviderProps = {
  players: Player[];
  action: Dispatch<PlayerAction>;
};


export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const playersData = [player1, player2]
  const [players, action] = useReducer(reducer, playersData);
  return (
    <PlayerContext.Provider value={{ players, action }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (playerId: PlayerId) => {
  const value = useContext(PlayerContext);
  if (!value)
    throw new Error(
      "usePlayer must be called in PlayerInfoProvider."
    );
  const selectedPlayer = value.players.find((p) => p.id === playerId);
  if (!selectedPlayer) throw new Error(`playerId "${playerId}" was not found`);
  return { player: selectedPlayer, action: value.action }
}