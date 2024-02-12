import { FC, PropsWithChildren, createContext, useContext, useState } from "react";
import { PlayerId } from "../types/Player";
import { Fighter } from "../types/fighter";
import { Coordinate } from "../types/Coordinate";
import { HitEffectProps } from "../components/HitEffect";

export type Phase = "SELECT_FIGHTER" | "SELECT_MOVE" | "CONFIRM_MOVE" | "SELECT_ATTACK" | "CONFIRM_ATTACK";


type GameInfo = {
  whichTurn: PlayerId;
  whichWon: PlayerId | undefined;
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
  toPhase: ToPhaseFunctions;
  hitEffect: HitEffectProps | undefined;
  setHitEffect: (hitEffect: HitEffectProps | undefined) => void;
}

type ToPhaseFunctions = {
  selectFighter: () => void;
  selectMove: (selectedFighter?: Fighter) => void;
  selectAttack: (selectedFighter?: Fighter) => void;
  confirmMove: (selectedHex: Coordinate) => void;
  confirmAttack: (selectedHex: Coordinate) => void
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
  const switchTurn = () => {
    setSelectedFighter(undefined);
    setSelectedHex(undefined);
    setPhase("SELECT_FIGHTER");
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
  }

  const toPhase: ToPhaseFunctions = {
    confirmMove: (selectedHex: Coordinate) => {
      setSelectedHex(selectedHex);
      setPhase("CONFIRM_MOVE");
    },
    confirmAttack: (selectedHex: Coordinate) => {
      setSelectedHex(selectedHex);
      setPhase("CONFIRM_ATTACK");
    },
    selectMove: (clickedFighter?: Fighter) => {
      if (!clickedFighter && !selectedFighter) throw new Error("SELECT_MOVE phase must be with selectedFighter")
      if (clickedFighter) setSelectedFighter(clickedFighter);
      setSelectedHex(undefined)
      setPhase("SELECT_MOVE");
    },
    selectFighter: () => {
      setPhase("SELECT_FIGHTER")
      setSelectedHex(undefined)
      setSelectedFighter(undefined)
    },
    selectAttack: (clickedFighter?: Fighter) => {
      if (!clickedFighter && !selectedFighter) throw new Error("SELECT_ATTACK phase must be with selectedFighter")
      if (clickedFighter) setSelectedFighter(clickedFighter);
      setSelectedHex(undefined)
      setPhase("SELECT_ATTACK")
    }
  }

  const isLastPhase = currentTurnNum === maxTurnNum && whichTurn === "B";

  const value: GameInfo = {
    whichWon,
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
    toPhase,
    hitEffect,
    setHitEffect,
    phase,
    setPhase
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