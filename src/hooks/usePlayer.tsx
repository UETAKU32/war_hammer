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
import { Coordinate } from "../types/Coordinate";
import { isEqual } from "lodash";
import { useGameInfo } from "./useGameInfo";

const PlayerContext = createContext<PlayerProviderProps | null>(null);

type PlayerAction =
  | { type: "SELECT"; payload: { selectedFighter: Fighter, whichTurn: PlayerId } }
  | { type: "ATTACK"; payload: { attacker: Fighter; receiver: Fighter } }
  | { type: "HEAL"; payload: { healHP: number; receiver: Fighter } }
  | { type: "ADD_VICTORY_POINT"; payload: { whichTurn: PlayerId } };

const reducer = produce((players: Player[], action: PlayerAction) => {
  let updatedPlayer: Player | undefined;
  switch (action.type) {
    //TODO: 初回selectedFighterIdがセットされないバグ
    case "SELECT":
      updatedPlayer = players.find(
        (player) => player.id === action.payload.whichTurn
      );
      if (!updatedPlayer) throw new Error(`Team${action.payload.whichTurn} was not found.`);
      updatedPlayer.selectedFighterId = action.payload.selectedFighter.id;
      break;
    case "ATTACK":
      break;
    case "HEAL":
      break;
    case "ADD_VICTORY_POINT":
      updatedPlayer = players.find(
        (player) => player.id === action.payload.whichTurn
      );
      if (!updatedPlayer) throw new Error(`Team${action.payload.whichTurn} was not found.`);
      updatedPlayer.victoryPoint++;
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

export const useCurrentTurnPlayer = () => {
  const { whichTurn } = useGameInfo();
  return usePlayer(whichTurn);
}

export const useAllPlayers = () => {
  const { player: playerA } = usePlayer("A");
  const { player: playerB } = usePlayer("B");
  return [playerA, playerB]
}

const useAllFighters = () => {
  const allPlayers = useAllPlayers();
  return allPlayers.flatMap((player) => player.fighters);
}

export const useFindFighterByCoordinate = () => {
  const allFighters = useAllFighters();
  const findFighterByCoordinate = (selectedCoordinate: Coordinate) => allFighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate))
  return { findFighterByCoordinate };
}