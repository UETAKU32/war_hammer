import { produce } from "immer";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Fighter } from "../types/fighter";
import { Player, PlayerId } from "../types/Player";
import { player1, player2 } from "../data/initialPlayers";
import { Coordinate } from "../types/Coordinate";
import { includes, isEqual } from "lodash";
import { useGameInfo } from "./useGameInfo";
import { HitEffectProps } from "../components/HitEffect";

const PlayerContext = createContext<PlayerProviderProps | null>(null);

type AttackProps = { attacker: Fighter; receiver: Fighter; coordinate: Coordinate };
type MoveProps = { fighter: Fighter; coordinate: Coordinate };
type HealProps = { healHP: number; receiver: Fighter };
type AddVictoryPointProps = { whichTurn: PlayerId };
type DamagedByPoisonProps = { damagedFighter: Fighter };
type AddLockedCountProps = { fighter: Fighter; count: number }
type guardProps = { fighter: Fighter; activatedOrNot: boolean }

type PlayerAction =
  | { type: "ATTACK"; payload: AttackProps }
  | { type: "MOVE"; payload: MoveProps }
  | { type: "HEAL"; payload: HealProps }
  | { type: "ADD_VICTORY_POINT"; payload: AddVictoryPointProps }
  | { type: "DAMAGED_BY_POISON"; payload: DamagedByPoisonProps }
  | { type: "ADD_LOCKED_COUNT"; payload: AddLockedCountProps }
  | { type: "REDUCE_LOCKED_COUNT"; }
  | { type: "CHANGE_GUARD_STATUS"; payload: guardProps };



const reducer = produce((players: Player[], action: PlayerAction) => {
  const { setHitEffect, } = useGameInfo();
  const reduceHp = useReduceHp();
  let updatedPlayer: Player | undefined;

  switch (action.type) {
    case "ATTACK":
      //0~10の乱数を生成、基準値を5として、(+防御力-攻撃力)分補正をする。乱数が補正後の値を超えているなら攻撃成功
      //クリティカルヒットは基準値を9として補正値の1/5を加算
      const randomNumber: number = Math.random() * 10;
      const attacker = action.payload.attacker
      const correction: number = action.payload.receiver.def - attacker.move.atk
      const successBorder: number = correction + 5
      const criticalBorder: number = correction / 5 + 9


      const attackerPlayer = players.find((p) => includes(p.fighters.map((f) => f.id), attacker.id))
      if (!attackerPlayer) throw new Error(`プレイヤーが見つかりませんでした`)
      const updatedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.receiver.id)
      if (!updatedFighter) throw new Error(`Fighter:${action.payload.receiver.name} was not found.`);

      if (randomNumber >= criticalBorder) {
        const hitEffect: HitEffectProps = {
          coordinate: action.payload.coordinate,
          hitType: "CRITICAL",
        }
        setHitEffect(hitEffect);
        reduceHp(updatedFighter, attacker.move.dmg + 1, attackerPlayer)
      } else if (randomNumber >= successBorder) {
        const hitEffect: HitEffectProps = {
          coordinate: action.payload.coordinate,
          hitType: "ATTACKED",
        }
        setHitEffect(hitEffect);
        reduceHp(updatedFighter, attacker.move.dmg, attackerPlayer)
      } else {
        const hitEffect: HitEffectProps = {
          coordinate: action.payload.coordinate,
          hitType: "DEFENDED",
        }
        setHitEffect(hitEffect);
      }
      break;
    case "MOVE":
      const movedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.fighter.id)
      if (!movedFighter) throw new Error(`Fghter:${action.payload.fighter.name} was not found.`);
      movedFighter.coordinate = action.payload.coordinate
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
    case "DAMAGED_BY_POISON":
      const damagedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.damagedFighter.id)
      if (!damagedFighter) throw new Error(`Fghter:${action.payload.damagedFighter.name} was not found.`);
      const enemyPlayer = players.find(player =>
        !player.fighters.some(fighter => fighter.id === damagedFighter.id)
      );
      if (!enemyPlayer) throw new Error(`enemyPlayer was not found.`);
      reduceHp(damagedFighter, 1, enemyPlayer)
      break;
    case "ADD_LOCKED_COUNT":
      const lockedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.fighter.id)
      if (!lockedFighter) throw new Error(`Fghter:${action.payload.fighter.name} was not found.`);
      lockedFighter.locked += action.payload.count;
      break;
    case "REDUCE_LOCKED_COUNT":
      players.flatMap((player) => player.fighters).filter((f) => f.locked > 0).forEach((fighter) => fighter.locked -= 1);
      break;

    case "CHANGE_GUARD_STATUS":
      const changedFighter = players.flatMap((player) => player.fighters).find((f) => f.id === action.payload.fighter.id)
      if (!changedFighter) throw new Error(`Fghter:${action.payload.fighter.name} was not found.`);
      changedFighter.guard = action.payload.activatedOrNot
      break;
    default:
      break;
  }
});

type PlayerProviderProps = {
  players: Player[];
  attack: (args: AttackProps) => void;
  move: (args: MoveProps) => void;
  heal: (args: HealProps) => void;
  addVictoryPoint: (args: AddVictoryPointProps) => void;
  damagedByPoison: (args: DamagedByPoisonProps) => void;
  addLockedCount: (args: AddLockedCountProps) => void;
  reduceLockedCount: () => void;
  changeGuard: (args: guardProps) => void;

};


export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const playersData = [player1, player2]
  const [players, action] = useReducer(reducer, playersData);
  const { switchTurn } = useGameInfo()
  const attack = useCallback((args: AttackProps) => action({ type: "ATTACK", payload: args }), []);
  const move = useCallback((args: MoveProps) => {
    action({ type: "MOVE", payload: args });
    switchTurn()
  }, [switchTurn]);
  const heal = useCallback((args: HealProps) => action({ type: "HEAL", payload: args }), []);
  const addVictoryPoint = useCallback((args: AddVictoryPointProps) => action({ type: "ADD_VICTORY_POINT", payload: args }), []);
  const damagedByPoison = useCallback((args: DamagedByPoisonProps) => action({ type: "DAMAGED_BY_POISON", payload: args }), []);
  const addLockedCount = useCallback((args: AddLockedCountProps) => action({ type: "ADD_LOCKED_COUNT", payload: args }), []);
  const reduceLockedCount = useCallback(() => action({ type: "REDUCE_LOCKED_COUNT" }), []);
  const changeGuard = useCallback((args: guardProps) => action({ type: "CHANGE_GUARD_STATUS", payload: args }), []);

  return (
    <PlayerContext.Provider value={{ players, attack, move, heal, addVictoryPoint, damagedByPoison, addLockedCount, reduceLockedCount, changeGuard }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const value = useContext(PlayerContext);
  if (!value)
    throw new Error(
      "usePlayer must be called in PlayerInfoProvider."
    );
  return value;
}

export const usePlayer = (playerId: PlayerId) => {
  const { players, ...props } = usePlayerContext();
  const selectedPlayer = useMemo(() => players.find((p) => p.id === playerId), [playerId, players]);
  if (!selectedPlayer) throw new Error(`playerId "${playerId}" was not found`);
  return { player: selectedPlayer, ...props }
}
export const useCurrentTurnPlayer = () => {
  const { whichTurn } = useGameInfo();
  return usePlayer(whichTurn);
}

export const useAllPlayers = () => {
  const { player: playerA } = usePlayer("A");
  const { player: playerB } = usePlayer("B");
  const allPlayers = useMemo(() => [playerA, playerB], [playerA, playerB]);
  return allPlayers;
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

export const usePlayersFighter = (id: PlayerId) => {
  const allPlayers = useAllPlayers();
  const fighters = allPlayers.find((player) => player.id === id)?.fighters
  if (!fighters) throw new Error(`指定されたプレイヤー:${id}は存在しません`)
  return fighters
}

/**
 * @returns findAllFighterByCoordinate - 全ファイターの中から座標検索をする関数
 * @returns findFighterByTeamAndCoordinate - 指定チームのファイターの中から座標検索をする関数
 */
export const useFindFighter = () => {
  const allPlayers = useAllPlayers();
  const allFighters = useMemo(() => allPlayers.flatMap((player) => player.fighters), [allPlayers]);

  const findFighterByCoordinate = useCallback((selectedCoordinate: Coordinate) => allFighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate)), [allFighters]);
  const findFighterByTeamAndCoordinate = useCallback((selectedCoordinate: Coordinate, selectedPlayer: PlayerId) => allPlayers.find(p => p.id === selectedPlayer)?.fighters.find((fighter) => isEqual(fighter.coordinate, selectedCoordinate)), [allPlayers]);
  return { findFighterByCoordinate, findFighterByTeamAndCoordinate }
}

export const useFindTeam = () => {
  const allPlayers = useAllPlayers();

  const findPlayerByFighter = useCallback((findFighter: Fighter): PlayerId => {
    let result: PlayerId | undefined = undefined;

    allPlayers.forEach((player) => {
      player.fighters.forEach(fighter => {
        if (isEqual(fighter, findFighter)) {
          result = player.id;
        }
      });
    })
    if (!result) {
      throw new Error(`Fighter with id ${findFighter} not found`);
    }
    return result;
  }, [allPlayers])
  return { findPlayerByFighter }

}


const useReduceHp = () => {

  const reduceHp = (damagedFighter: Fighter, damage: number, attackPlayer: Player) => {
    console.log({ damagedFighter })
    damagedFighter.currentHp -= damage;
    //NOTE: HPが0になった場合の処理
    if (damagedFighter.currentHp <= 0) {
      damagedFighter.currentHp = 0;
      damagedFighter.coordinate = undefined;
      attackPlayer.victoryPoint += 1;
    }
  }
  return reduceHp;
}
