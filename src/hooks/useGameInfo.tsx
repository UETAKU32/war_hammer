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

type GameInfo = {
  teams: Team[];
};

export type TeamName = "A" | "B";

export type Team = {
  name: TeamName;
  victoryPoint: number;
  fighters: Fighter[];
};

const team1: Team = {
  name: "A",
  victoryPoint: 10,
  fighters: [
    {
      id: 1,
      name: "ピカチュウ",
      maxHp: 10,
      currentHp: 10,
    },
    {
      id: 2,
      name: "コラった",
      maxHp: 20,
      currentHp: 20,
    },
    {
      id: 3,
      name: "ぽっぽ",
      maxHp: 20,
      currentHp: 20,
    },
  ],
};

const team2: Team = {
  name: "B",
  victoryPoint: 0,
  fighters: [
    {
      id: 4,
      name: "ヒトカゲ",
      maxHp: 10,
      currentHp: 10
    },
    {
      id: 5,
      name: "キャタピ",
      maxHp: 20,
      currentHp: 20
    },
    {
      id: 6,
      name: "ゼニガメ",
      maxHp: 20,
      currentHp: 4
    },
  ],
};

const initialGameInfo: GameInfo = {
  teams: [team1, team2],
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
      const updatedTeam = gameInfo.teams.find(
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
