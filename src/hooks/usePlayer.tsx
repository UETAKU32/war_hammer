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
  | { type: "ATTACK"; payload: { attacker: Fighter; receiver: Fighter } }
  | { type: "MOVE"; payload: { fighter: Fighter; coordinate: Coordinate } }
  | { type: "HEAL"; payload: { healHP: number; receiver: Fighter } }
  | { type: "ADD_VICTORY_POINT"; payload: { whichTurn: PlayerId } };

const reducer = produce((players: Player[], action: PlayerAction) => {
  let updatedPlayer: Player | undefined;
  switch (action.type) {
    case "ATTACK":
      //0~10の乱数を生成、基準値を5として、(+防御力-攻撃力)分補正をする。乱数が補正後の値を超えているなら攻撃成功
      //クリティカルヒットは基準値を9として補正値の1/5を加算
      const randomNumber: number = Math.random() * 10;
      const correction: number = action.payload.receiver.def - action.payload.attacker.move.atk
      const successBorder: number = correction + 5
      const criticalBorder: number = correction / 5 + 9
      if (randomNumber >= criticalBorder) {
        const updatedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.receiver.id)
        if (!updatedFighter) throw new Error(`Fghter:${action.payload.receiver.name} was not found.`);
        updatedFighter.currentHp -= (action.payload.attacker.move.dmg + 1)
      } else if (randomNumber >= successBorder) {
        const updatedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.receiver.id)
        if (!updatedFighter) throw new Error(`Fghter:${action.payload.receiver.name} was not found.`);
        updatedFighter.currentHp -= (action.payload.attacker.move.dmg)
      }
      break;
    case "MOVE":
      const updatedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.fighter.id)
      if (!updatedFighter) throw new Error(`Fghter:${action.payload.fighter.name} was not found.`);
      updatedFighter.coordinate = action.payload.coordinate
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

export const useFighter = (id: number | undefined) => {
  const allFighters = useAllFighters();
  if (!id) return
  const fighter = allFighters.find((fighter) => fighter.id === id)
  if (!fighter) throw new Error(`指定されたファイター:${id}は存在しません`)
  return fighter
}

//全ファイターの中から座標検索をする関数
export const useFindAllFighterByCoordinate = () => {
  const allFighters = useAllFighters();
  const findAllFighterByCoordinate = (selectedCoordinate: Coordinate) => allFighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate))
  return { findAllFighterByCoordinate };
}

//指定チームのファイターの中から座標検索をする関数
export const useFindTeamFighterByCoordinate = (playerId: PlayerId) => {
  const teamFighters = usePlayer(playerId).player.fighters
  const findTeamFighterByCoordinate = (selectedCoordinate: Coordinate) => teamFighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate))
  return { findTeamFighterByCoordinate };
}

//指定チームにとって敵チームのファイターの中から座標検索をする関数
export const useEnemyTeamFighterByCoordinate = (playerId: PlayerId) => {
  const enemyId: PlayerId = playerId === "A" ? "B" : "A";
  const enemyFighters = usePlayer(enemyId).player.fighters
  const findEnemyFighterByCoordinate = (selectedCoordinate: Coordinate) => enemyFighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate))
  return { findEnemyFighterByCoordinate };
}