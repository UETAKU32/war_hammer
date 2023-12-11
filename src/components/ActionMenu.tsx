import React, { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate'
import { CenterPoint } from '../types/CenterPoint'
import ActionIcon from './ActionIcon'

interface ActionMenuProps {
    coordinate: Coordinate
}

const ActionMenu: FC<ActionMenuProps> = ({ coordinate }) => {
    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate)

    return (
        <>
            <ActionIcon action={'Attack'} point={{
                x: centerPoint.x - 30,
                y: centerPoint.y
            }} />
            <ActionIcon action={'Move'} point={{
                x: centerPoint.x + 30,
                y: centerPoint.y
            }} />

        </>
    )
}

export default ActionMenu