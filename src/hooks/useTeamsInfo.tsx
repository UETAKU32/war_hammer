import { produce } from "immer";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

type Fighter = {
  id: number;
  name: string;
  hp: number;
};

type GameInfo = {
  players: PlayerInfo[];
};

type Team = "A" | "B";

export type PlayerInfo = {
  team: Team;
  victoryPoint: number;
  fighters: Fighter[];
};

const player1: PlayerInfo = {
  team: "A",
  victoryPoint: 10,
  fighters: [
    {
      id: 1,
      name: "pikachu",
      hp: 100,
    },
    {
      id: 2,
      name: "koratta",
      hp: 20,
    },
  ],
};

const player2: PlayerInfo = {
  team: "B",
  victoryPoint: 0,
  fighters: [
    {
      id: 3,
      name: "hitokage",
      hp: 100,
    },
    {
      id: 4,
      name: "kyatapi",
      hp: 20,
    },
  ],
};

const initialGameInfo: GameInfo = {
  players: [player1, player2],
};

type GameAction =
  | { type: "ATTACK"; payload: { attacker: Fighter; receiver: Fighter } }
  | { type: "HEAL"; payload: { healHP: number; receiver: Fighter } }
  | { type: "ADD_VICTORY_POINT"; payload: { team: Team } };

const reducer = produce((gameInfo: GameInfo, action: GameAction) => {
  switch (action.type) {
    case "ATTACK":
      break;
    case "HEAL":
      break;
    case "ADD_VICTORY_POINT":
      const selectedTeam = action.payload.team;
      const updatedTeam = gameInfo.players.find(
        (player) => player.team === selectedTeam
      );
      if (!updatedTeam) throw new Error(`Team${selectedTeam} was not found.`);
      updatedTeam.victoryPoint++;
      break;
    default:
      break;
  }
});

type PlayerInfoProviderProps = {
  gameInfo: GameInfo;
  action: Dispatch<GameAction>;
};

const PlayerInfoContext = createContext<PlayerInfoProviderProps | null>(null);

export const PlayerInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameInfo, action] = useReducer(reducer, initialGameInfo);
  return (
    <PlayerInfoContext.Provider value={{ gameInfo, action }}>
      {children}
    </PlayerInfoContext.Provider>
  );
};

export const usePlayerInfo = () => {
  const value = useContext(PlayerInfoContext);
  if (!value)
    throw new Error(
      "usePlayerInfoはPlayerInfoProviderの子でしか呼び出せません！"
    );
  return value;
};
