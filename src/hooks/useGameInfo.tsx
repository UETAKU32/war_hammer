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
      name: "聖騎士ユナ",
      maxHp: 8,
      currentHp: 8,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "エクスカリバー",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 0,
        col: 0,
      },
      image: "WomanKnight.png",
    },
    {
      id: 2,
      name: "熟達の狩人",
      maxHp: 20,
      currentHp: 20,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "弓狙撃",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 1,
        col: 1,
      },
      image: "Hunter.png",
    },
    {
      id: 3,
      name: "ケットシー",
      maxHp: 20,
      currentHp: 20,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "キャットレイピア",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 2,
        col: 2,
      },
      image: "CaitSith.png",
    },
  ],
};

const team2: Team = {
  name: "B",
  victoryPoint: 0,
  fighters: [
    {
      id: 4,
      name: "ナーガ",
      maxHp: 10,
      currentHp: 5,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "蛇の邪眼",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 3,
        col: 3,
      },
      image: "Naga.png",
    },
    {
      id: 5,
      name: "ジョーカー",
      maxHp: 20,
      currentHp: 20,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "死の奇術",
        atk: 4,
        range: 4,
        dmg: 4,
      },
      coordinate: {
        row: 4,
        col: 4,
      },
      image: "Clown.png",
    },
    {
      id: 6,
      name: "ワーウルフ",
      maxHp: 20,
      currentHp: 4,
      agl: 3,
      def: 5,
      sleep: 0,
      move: {
        name: "引き裂きの爪",
        atk: 4,
        range: 2,
        dmg: 2,
      },
      coordinate: {
        row: 5,
        col: 5,
      },
      image: "WolfMan.png",
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
