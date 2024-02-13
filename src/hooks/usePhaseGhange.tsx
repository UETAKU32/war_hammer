import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
} from "react";
import { Fighter } from "../types/fighter";
import { Coordinate } from "../types/Coordinate";
import { useCurrentTurnPlayer } from "./usePlayer";
import { useGameInfo } from "./useGameInfo";

const PhanseChangeContext = createContext<PhaseChangeProps | null>(null);

type PhaseChangeProps = {
    selectFighter: () => void;
    selectMove: (selectedFighter?: Fighter) => void;
    selectAttack: (selectedFighter?: Fighter) => void;
    confirmMove: (selectedHex: Coordinate) => void;
    confirmAttack: (selectedHex: Coordinate) => void;
    doMove: (selectedHex: Coordinate) => void;
};

export const PhaseChangeProvider: FC<PropsWithChildren> = ({ children }) => {

    const { action } = useCurrentTurnPlayer();
    const { setSelectedHex, selectedFighter, setPhase, setSelectedFighter, switchTurn } = useGameInfo()

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

    const doMove = (selectedHex: Coordinate) => {
        if (!selectedFighter) return
        action({ type: "MOVE", payload: { fighter: selectedFighter, coordinate: selectedHex } });
        switchTurn();
    }

    const toPhase: PhaseChangeProps = {
        confirmMove,
        confirmAttack,
        selectMove,
        selectFighter,
        selectAttack,
        doMove
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
