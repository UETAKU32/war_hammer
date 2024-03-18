import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
} from "react";
import { Fighter } from "../types/fighter";
import { Coordinate } from "../types/Coordinate";
import { useGameInfo } from "./useGameInfo";

const PhanseChangeContext = createContext<PhaseChangeProps | null>(null);

type PhaseChangeProps = {
    selectFighter: () => void;
    selectMove: (selectedFighter?: Fighter) => void;
    selectAttack: (selectedFighter?: Fighter) => void;
    confirmMove: (selectedHex: Coordinate) => void;
    confirmAttack: (selectedHex: Coordinate) => void;
};

/**
 * フェーズ変更を提供するProvider
 * ファイター情報やプレイヤー情報の変更は行わない
 * @param param0 
 * @returns 
 */
export const PhaseChangeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { phase, setSelectedHex, selectedFighter, setPhase, setSelectedFighter, switchTurn, hitEffect, targetFighter } = useGameInfo()

    useEffect(() => {
        if (phase === "CONFIRM_ATTACK" && targetFighter && hitEffect) {
            if (targetFighter.currentHp > 0 && (hitEffect.hitType === "ATTACKED" || hitEffect.hitType === "CRITICAL")) {
                setPhase("SELECT_PUSH");
            } else {
                switchTurn();
            }
        }
    }, [hitEffect, setPhase, targetFighter, switchTurn, phase])

    const confirmMove = (selectedHex: Coordinate) => {
        setSelectedHex(selectedHex);
        setPhase("CONFIRM_MOVE");
    }

    const confirmAttack = (selectedHex: Coordinate) => {
        setSelectedHex(selectedHex);
        setPhase("CONFIRM_ATTACK");
    }

    const selectMove = (clickedFighter: Fighter | undefined) => {
        if (!clickedFighter && !selectedFighter) throw new Error("SELECT_MOVE phase must be with selectedFighter")
        if (clickedFighter) setSelectedFighter(clickedFighter);
        setSelectedHex(undefined)
        setPhase("SELECT_MOVE");
    }

    const selectFighter = () => {
        setPhase("SELECT_FIGHTER")
        setSelectedHex(undefined)
        setSelectedFighter(undefined)
    };

    const selectAttack = (clickedFighter: Fighter | undefined) => {
        if (!clickedFighter && !selectedFighter) throw new Error("SELECT_ATTACK phase must be with selectedFighter")
        if (clickedFighter) setSelectedFighter(clickedFighter);
        setSelectedHex(undefined)
        setPhase("SELECT_ATTACK")
    };


    const toPhase: PhaseChangeProps = {
        confirmMove,
        confirmAttack,
        selectMove,
        selectFighter,
        selectAttack,
    }

    return (
        <PhanseChangeContext.Provider value={toPhase}>
            {children}
        </PhanseChangeContext.Provider>
    );
};

export const usePhaseChange = () => {

    const value = useContext(PhanseChangeContext);

    if (!value)
        throw new Error(
            "usePhaseChange must be called in PlayerInfoProvider."
        );
    return value
}
