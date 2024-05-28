import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { PlayerId } from "../types/Player";
import { Fighter } from "../types/fighter";
import { Coordinate } from "../types/Coordinate";
import { HitEffectProps } from "../components/HitEffect";
import { MAX_TREASURE_COUNT, treasureCoordinates } from "../data/map";
import { isEqual } from "lodash";


export type Phase = "SELECT_FIGHTER" | "SELECT_MOVE" | "CONFIRM_MOVE" | "SELECT_ATTACK" | "CONFIRM_ATTACK" | "SELECT_PUSH" | "CONFIRM_PUSH";
//大文字に変えて、gameinfoで定義する
export type HitType = "CRITICAL" | "ATTACKED" | "DEFENDED"

type Treasure = {
  count: number;
  coordinate: Coordinate;
}

type GameInfo = {
  whichTurn: PlayerId;
  whichWon: PlayerId | undefined;
  setWhichWon: (playerId: PlayerId) => void;
  maxTurnNum: number;
  currentTurnNum: number;
  selectedFighter: Fighter | undefined;
  setSelectedFighter: (fighter: Fighter | undefined) => void;
  targetFighter: Fighter | undefined;
  setTargetFighter: (fighterId: Fighter | undefined) => void;
  selectedHex: Coordinate | undefined;
  setSelectedHex: (coordinate: Coordinate | undefined) => void;
  switchTurn: () => void;
  phase: Phase;
  setPhase: (phase: Phase) => void;
  hitEffect: HitEffectProps | undefined;
  setHitEffect: (hitEffect: HitEffectProps | undefined) => void;
  pushedHex: Coordinate | undefined;
  setPushedHex: (coordinate: Coordinate | undefined) => void;
  findTreasureAt: (coordinate: Coordinate) => Treasure | undefined;
  decreaseTreasureCount: (coordinate: Coordinate) => void;
}


const GameInfoContext = createContext<GameInfo | null>(null);

export const GameInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const maxTurnNum = 10;
  const [currentTurnNum, setCurrentTurnNum] = useState(1);
  //NOTE: playerに持たせるべき・・？？考え中
  const [whichWon, setWhichWon] = useState<PlayerId>();
  const [whichTurn, setWhichTurn] = useState<PlayerId>("A");
  const [selectedFighter, setSelectedFighter] = useState<Fighter | undefined>();
  const [targetFighter, setTargetFighter] = useState<Fighter | undefined>();
  const [selectedHex, setSelectedHex] = useState<Coordinate | undefined>();
  const [phase, setPhase] = useState<Phase>("SELECT_FIGHTER");
  const [hitEffect, setHitEffect] = useState<HitEffectProps | undefined>();
  const [pushedHex, setPushedHex] = useState<Coordinate | undefined>();
  const [treasures, setTreasures] = useState<Treasure[]>(treasureCoordinates.map((coordinate) => ({ count: MAX_TREASURE_COUNT, coordinate })));
  const isLastPhase = currentTurnNum === maxTurnNum && whichTurn === "B";
  const switchTurn = useCallback(() => {
    //TODO: ファイターがいる宝箱のみ-1
    //  暫定処理でターン変更時、全ての宝箱のカウントを強制的に-1
    setSelectedFighter(undefined);
    setSelectedHex(undefined);
    setPhase("SELECT_FIGHTER");
    setTargetFighter(undefined)
    if (!isLastPhase) {
      if (whichTurn === "A") {
        setWhichTurn("B");
      } else {
        setWhichTurn("A");
        setCurrentTurnNum((prevTurnNum) => prevTurnNum + 1);
      }
    } else {
      setWhichWon("A")
    }
  }, [isLastPhase, whichTurn]);

  const findTreasureAt = useCallback((coordinate: Coordinate) => treasures.find((treasure) => isEqual(treasure.coordinate, coordinate)), [treasures]);

  const decreaseTreasureCount = useCallback((coordinate: Coordinate) => {
    setTreasures((prevTreasures) => prevTreasures.map((treasure) => {
      if (isEqual(treasure.coordinate, coordinate)) {
        return { ...treasure, count: treasure.count - 1 };
      }
      return treasure;
    }))
  }, []);

  const value: GameInfo = {
    whichWon,
    setWhichWon,
    whichTurn,
    maxTurnNum,
    currentTurnNum,
    selectedFighter,
    setSelectedFighter,
    targetFighter,
    setTargetFighter,
    selectedHex,
    setSelectedHex,
    switchTurn,
    hitEffect,
    setHitEffect,
    phase,
    setPhase,
    pushedHex,
    setPushedHex,
    findTreasureAt,
    decreaseTreasureCount,
  }

  return (<GameInfoContext.Provider value={value}>
    {children}
  </GameInfoContext.Provider>)
}

export const useGameInfo = () => {
  const value = useContext(GameInfoContext);
  if (!value)
    throw new Error(
      "useGameInfo must be called in GameInfoProvider."
    );
  return value;
}