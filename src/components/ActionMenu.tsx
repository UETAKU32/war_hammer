import { FC } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import { AttackIcon, MoveIcon } from './ActionIcon'
import { hexWidth } from '../lib/hexSize'
import { useGameInfo } from '../hooks/useGameInfo'
import { Coordinate } from '../types/Coordinate'

interface ActionMenuProps {
    coordinate: Coordinate
}

const ActionMenu: FC<ActionMenuProps> = ({ coordinate }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)

    const { toPhase } = useGameInfo()

    return (
        <>
            <AttackIcon
                point={{
                    x: centerPoint.x - hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={toPhase.selectAttack} />
            <MoveIcon
                point={{
                    x: centerPoint.x + hexWidth / 3,
                    y: centerPoint.y
                }}
                onClick={toPhase.selectMove} />
        </>
    )
}

export default ActionMenu