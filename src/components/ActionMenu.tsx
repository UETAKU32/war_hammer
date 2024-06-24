import { FC } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import { AttackIcon, GuardIcon, MoveIcon } from './ActionIcon'
import { hexWidth } from '../lib/hexSize'
import { useGameInfo } from '../hooks/useGameInfo'
import { Coordinate } from '../types/Coordinate'

interface ActionMenuProps {
    coordinate: Coordinate
}

const ActionMenu: FC<ActionMenuProps> = ({ coordinate }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)
    const { selectedFighter } = useGameInfo()
    const isLocked = selectedFighter?.locked ? true : false;

    const { setPhase } = useGameInfo()

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

    }

    return (
        <>
            <AttackIcon
                point={{
                    x: centerPoint.x - hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickAttack}
                isLocked={isLocked} />
            <MoveIcon
                point={{
                    x: centerPoint.x + hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickMove}
                isLocked={isLocked} />
            <GuardIcon
                point={{
                    x: centerPoint.x,
                    y: centerPoint.y + hexWidth / 3,
                }}
                onClick={handleClickguard}
                isLocked={isLocked} />
        </>
    )
}

export default ActionMenu