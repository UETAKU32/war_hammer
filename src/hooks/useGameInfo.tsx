import { FC, PropsWithChildren, createContext, useContext, useState } from "react";
import { PlayerId } from "../types/Player";
import { Fighter } from "../types/fighter";
import { Coordinate } from "../types/Coordinate";

export type Phase = "SELECT_FIGHTER" | "SELECT_MOVE" | "CONFIRM_MOVE" | "SELECT_ATTACK" | "CONFIRM_ATTACK";


type GameInfo = {
  whichTurn: PlayerId;
  whichWon?: PlayerId;
  maxTurnNum: number;
  currentTurnNum: number;
  selectedFighter?: Fighter;
  setSelectedFighter: (fighter: Fighter | undefined) => void;
  targetFighter?: Fighter;
  setTargetFighter: (fighterId: Fighter | undefined) => void;
  selectedHex?: Coordinate;
  setSelectedHex: (coordinate: Coordinate | undefined) => void;
  switchTurn: () => void;
  phase: Phase;
  setPhase: (phase: Phase) => void;
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
  const switchTurn = () => {
    if (currentTurnNum <= maxTurnNum) {
      if (whichTurn === "A") {
        setWhichTurn("B");
      } else {
        setWhichTurn("A");
        setCurrentTurnNum((prevTurnNum) => prevTurnNum + 1);
      }
    } else {
      setWhichWon("A")
      console.log({ whichWon })
    }
  }

  const value: GameInfo = {
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