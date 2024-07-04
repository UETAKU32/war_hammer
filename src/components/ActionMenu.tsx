import { FC } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import { AttackIcon, EndIcon, GuardIcon, MoveIcon } from './ActionIcon'
import { hexWidth } from '../lib/hexSize'
import { useGameInfo } from '../hooks/useGameInfo'
import { Coordinate } from '../types/Coordinate'
import { usePhaseChange } from '../hooks/usePhaseGhange'
import { usePlayer } from '../hooks/usePlayer'

interface ActionMenuProps {
    coordinate: Coordinate
}

const ActionMenu: FC<ActionMenuProps> = ({ coordinate }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)
    const { selectedFighter, switchTurn, pushedHex, setPushedHex } = useGameInfo()
    const isLocked = selectedFighter?.locked ? true : false;

    const { phase, setPhase, whichTurn } = useGameInfo();
    const { confirmGuard } = usePhaseChange();
    const { changeGuard, reduceLockedCount } = usePlayer(whichTurn);

    //選択されたファイターがlockedだった場合、なんの機能も持たない関数を返す
    //NOTEこの関数をエラー音を発生させるように改造し、LOCkされたファイターが行動しようとした場合にエラー音を出させたい
    const incapableOfAction = () => { }

    const handleClickMove = () => {
        isLocked ? incapableOfAction() : setPhase("SELECT_MOVE")
    }

    const handleClickAttack = () => {
        isLocked ? incapableOfAction() : setPhase("SELECT_ATTACK")
    }

    const handleClickguard = () => {
        phase === "CONFIRM_GUARD" ? confirmGuard() : setPhase("CONFIRM_GUARD");
        if (!selectedFighter) throw new Error(`Fighter:${selectedFighter} was not found.`);
        ((phase === "CONFIRM_GUARD") && changeGuard({ fighter: selectedFighter, activatedOrNot: true }));
        ((phase === "CONFIRM_GUARD") && reduceLockedCount())
    }

    const handleClickEnd = () => {
        (phase === "CONFIRM_PUSH" && pushedHex === undefined) ? confirmGuard() : setPhase("CONFIRM_PUSH");
        (phase === "CONFIRM_PUSH" && pushedHex) && setPushedHex(undefined);
        phase === "SELECT_PUSH" && setPushedHex(undefined);
    }

    return (
        <>
            {(phase !== "SELECT_PUSH" && phase !== "CONFIRM_PUSH") && <AttackIcon
                point={{
                    x: centerPoint.x - hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickAttack}
                isLocked={isLocked} />}
            {(phase !== "SELECT_PUSH" && phase !== "CONFIRM_PUSH") && <MoveIcon
                point={{
                    x: centerPoint.x + hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickMove}
                isLocked={isLocked} />}
            {(phase !== "SELECT_PUSH" && phase !== "CONFIRM_PUSH") && <GuardIcon
                point={{
                    x: centerPoint.x,
                    y: centerPoint.y - hexWidth / 3,
                }}
                onClick={handleClickguard}
                isLocked={isLocked} />}
            {(phase === "SELECT_PUSH" || phase === "CONFIRM_PUSH") && <EndIcon
                point={{
                    x: centerPoint.x,
                    y: centerPoint.y + hexWidth / 3,
                }}
                onClick={handleClickEnd}
                isLocked={isLocked} />}
        </>
    )
}

export default ActionMenu

