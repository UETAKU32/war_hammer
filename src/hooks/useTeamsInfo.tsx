import { produce } from "immer";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type Fighter = {
  id: number;
  name: string;
  hp: number;
};

type GameInfo = {
  players: Team[];
};

type TeamName = "A" | "B";

export type Team = {
  name: TeamName;
  victoryPoint: number;
  fighters: Fighter[];
};

const player1: Team = {
  name: "A",
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

const player2: Team = {
  name: "B",
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

type TeamAction =
  | { type: "ATTACK"; payload: { attacker: Fighter; receiver: Fighter } }
  | { type: "HEAL"; payload: { healHP: number; receiver: Fighter } }
  | { type: "ADD_VICTORY_POINT"; payload: { team: TeamName } };

const reducer = produce((gameInfo: GameInfo, action: TeamAction) => {
  switch (action.type) {
    case "ATTACK":
      break;
    case "HEAL":
      break;
    case "ADD_VICTORY_POINT":
      const selectedTeam = action.payload.team;
      const updatedTeam = gameInfo.players.find(
        (player) => player.name === selectedTeam
      );
      if (!updatedTeam) throw new Error(`Team${selectedTeam} was not found.`);
      updatedTeam.victoryPoint++;
      break;
    default:
      break;
  }
});

type GameInfoProviderProps = {
  gameInfo: GameInfo;
  action: Dispatch<TeamAction>;
};

const GameInfoContext = createContext<GameInfoProviderProps | null>(null);

export const GameInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameInfo, action] = useReducer(reducer, initialGameInfo);
  return (
    <GameInfoContext.Provider value={{ gameInfo, action }}>
      {children}
    </GameInfoContext.Provider>
  );
};

export const useGameInfo = () => {
  const value = useContext(GameInfoContext);
  if (!value)
    throw new Error(
      "usePlayerInfoはPlayerInfoProviderの子でしか呼び出せません！"
    );
  return value;
};
