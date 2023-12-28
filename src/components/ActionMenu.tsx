import { FC } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import { AttackIcon, MoveIcon } from './ActionIcon'
import { hexWidth } from '../lib/hexSize'
import { Fighter } from '../types/fighter'
import { useGameInfo } from '../hooks/useGameInfo'

interface ActionMenuProps {
    selectedFighter: Pick<Fighter, "coordinate">
}

const ActionMenu: FC<ActionMenuProps> = ({ selectedFighter: { coordinate } }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)

    const { setPhase } = useGameInfo()

    const handleClickMove = () => {
        setPhase("SELECT_MOVE")
    }

    const handleClickAttack = () => {
        setPhase("SELECT_ATTACK")
    }

    return (
        <>
            <AttackIcon
                point={{
                    x: centerPoint.x - hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickAttack} />
            <MoveIcon
                point={{
                    x: centerPoint.x + hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={handleClickMove} />
        </>
    )
}

export default ActionMenu