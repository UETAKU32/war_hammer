import React, { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import ActionIcon from './ActionIcon'
import { hexWidth } from '../lib/hexSize'

interface ActionMenuProps {
    coordinate: Coordinate
}

const ActionMenu: FC<ActionMenuProps> = ({ coordinate }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)

    return (
        <>
            <ActionIcon action={'Attack'} point={{
                x: centerPoint.x - hexWidth / 3,
                y: centerPoint.y
            }} />
            <ActionIcon action={'Move'} point={{
                x: centerPoint.x + hexWidth / 3,
                y: centerPoint.y
            }} />

        </>
    )
}

export default ActionMenu